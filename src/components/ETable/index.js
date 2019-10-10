import React, { Component } from 'react';
import Utils from '../../utils/utils';
import { Table } from 'antd';

export default class ETable extends Component {
  /**
   * 点击表格某行触发onRow,里面的onClick我们绑定了onRowClick事件
   */
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection == 'checkbox') {
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem;
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    } else {
      // 我们想把这两个值保存在父组件的state里,所以使用父组件传过来的updateSelectedItem,这个方法里面就是把数据存入state中,注意父组件传过来的时候绑定了父组件的上下文this, 所以在这个方法中this.setState({})才能存入父组件上下文的state中
      let selectedRowKeys = [index];
      let selectedItem = record;
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    }
  };

  tableInit = () => {
    // row_selection 是一个标志位(开关)，用于判断用户是要单选还是多选还是都不要
    let row_selection = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    if (row_selection === false || row_selection === null) {
      // 单选多选都不要
      row_selection = false;
    } else if (row_selection == 'checkbox') {
      // 多选
      rowSelection.type = 'checkbox';
    } else {
      // 单选,因为默认也就是单选，所以不需要rowSelection.type='radio'，我们就更新下标志位就行了
      row_selection = 'radio';
    }
    return (
      <Table
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (!row_selection) {
                return;
              }
              this.onRowClick(record, index);
            }
          };
        }}
      />
    );
  };

  render() {
    return <div>{this.tableInit()}</div>;
  }
}
