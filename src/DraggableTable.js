import React from 'react';
import styled from 'styled-components'
import BaseTable,{callOrReturn} from 'react-base-table'
import 'react-base-table/styles.css'
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
//const { sortableContainer, sortableElement, sortableHandle } = ReactSortableHoc
const DraggableContainer = sortableContainer(({ children }) => children)
const DraggableElement = sortableElement(({ children }) => children)
const DraggableHandle = sortableHandle(({ children }) => children)
const defaultSort = { key: 'column-0', order: 'asc' }
const generateData = (columns, count = 200, prefix = 'r-') =>
  new Array(count).fill(0).map((row, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `R${rowIndex}-C${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    )
  })

  const generateColumns = (count = 10, prefix = 'c-', props) =>
  new Array(count).fill(0).map((column, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `C ${columnIndex}`,
    width: 150,
  }))

const Handle = styled.div`
  flex: none;
  width: 7.5px;
  height: 100%;

  &::before {
    content: '';
    border-left: 4px dotted #ccc;
    display: block;
    height: 20px;
    margin: 15px 3px;
  }

  &:hover::before {
    border-color: #888;
  }
`

const Row = ({ key, index, children, ...rest }) => (
  <DraggableElement key={key} index={index}>
    <div {...rest}>
      <DraggableHandle>
        <Handle />
      </DraggableHandle>
      {children}
    </div>
  </DraggableElement>
)

const rowProps = ({ rowIndex }) => ({
  tagName: Row,
  index: rowIndex,
})

class DraggableTable extends React.PureComponent {
  state = {
    data: this.props.data,
    sortBy: defaultSort,
  }

  table = React.createRef()

  getContainer = () => {
    return this.table.current.getDOMNode().querySelector('.BaseTable__body')
  }

  getHelperContainer = () => {
    return this.table.current.getDOMNode().querySelector('.BaseTable__table')
  }

  rowProps = args => {
    // don't forget to passing the incoming rowProps
    const extraProps = callOrReturn(this.props.rowProps)
    return {
      ...extraProps,
      tagName: Row,
      index: args.rowIndex,
    }
  }

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const data = [...this.state.data]
    const [removed] = data.splice(oldIndex, 1)
    data.splice(newIndex, 0, removed)
    this.setState({ data })
  }

  onColumnSort = sortBy => {
    this.setState({
      sortBy,
      data: this.state.data.reverse(),
    })
  }

  render() {
    return (
      <DraggableContainer
        useDragHandle
        getContainer={this.getContainer}
        helperContainer={this.getHelperContainer}
        onSortEnd={this.handleSortEnd}
      >
      <BaseTable width={700} height={400} {...this.props}
          ref={this.table}
          data={this.state.data}
          sortBy={this.state.sortBy}
          onColumnSort={this.onColumnSort}
          fixed={false}
          rowProps={this.rowProps} />
      </DraggableContainer>
    )
  }
}

// const Hint = styled.div`
//   font-size: 16px;
//   font-weight: 700;
//   color: #336699;
//   margin-bottom: 10px;
// `

const columns = generateColumns(8)
const data = generateData(columns, 110)
columns[0].minWidth = 70
for (let i = 0; i < 2; i++) columns[i].sortable = true

export default () => (
  <>
    {/* <Hint>Drag the dots, to drag the columns</Hint> */}
    <DraggableTable columns={columns} data={data} />
  </>
)
