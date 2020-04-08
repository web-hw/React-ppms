import * as React from 'react'
import {} from 'react-router-dom'
import { Pagination } from 'antd'

import Loading from '../loading'
const style = require('./style')

export type TClickCol = {
  event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  row?: TData // 行数据
  col?: TColumn // head 列
  rowIdx?: number | string // 行数
  colIdx?: number // 列数
}

export type TClickRow = {
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  row?: TData // 行数据
  rowIdx?: number | string // 行数
}

export type TColumn = {
  label?: '序号' | string | ((props: TColumn) => JSX.Element) // 显示label
  field: 'index' | string // 字段
  width?: number // 宽度
  clickTbodyCol?: (param: TClickCol) => void // 点击tbody中的列
  clickTHeadCol?: (param: TClickCol) => void // 点击thead中的列
  align?: 'left' | 'center' | 'right' // 水平位置
  handleIndex?: (props: TData) => JSX.Element
}

export interface TData {
  [propName: string]:
    | string
    | number
    | (TData[])
    | ((props: TData) => JSX.Element)
}

interface IPropsThead {
  columns: TColumn[] // 列字段
  wrapperThead?: string // className of thead wrapper
  height?: number // 高度
  isBorder?: boolean
  clickTHeadRow?: (param: TClickRow) => void
}

interface IPropsTbody {
  wrapperTbody?: string // className of tbody wrapper
  data?: TData[] // 数据
  empty?: string // 空内容
  height?: number
  columns: TColumn[]
  isWrap?: boolean // 是否换行
  isBorder?: boolean
  clickTbodyRow?: (param: TClickRow) => void
  indent?: number // tree缩进
  indentColumn?: string // 缩进列字段
  childrenColumn?: string // tree属性名
}

interface IPropsTable extends IPropsThead, IPropsTbody {
  wrapperTable?: string // className of table wrapper
  total?: number // 页大小
  pageSizeOptions?: string[] // 页大小选择
  minWidth?: number
  loading?: boolean
  changePage?: (page: number, size: number) => void // 页切换
  changeSize?: (page: number, size: number) => void // 页大小切换
}

interface IStateTable {
  currentPage: number
  pageSize: number
}

export default class Table extends React.PureComponent<
  IPropsTable,
  IStateTable
> {
  private _pageSizeOptions = ['30', '60', '80']
  private _table: HTMLDivElement = null

  static rowClick = (callback: Function, param: {}, isPrevent = true) => {
    if (!callback) {
      return null
    }

    return (event: any) => {
      if (isPrevent) {
        event.preventDefault()
        event.stopPropagation()
      }
      callback({ event, ...param })
    }
  }

  // th
  static Th = (props: { col: TColumn; colIdx: number; height: number }) => {
    const { col, colIdx, height } = props
    const width = col.width ? `${col.width * 100}%` : 'auto'
    const textAlign = col.align || 'center'

    // 处理JSX.Element
    let Text: React.ReactNode = col.label || ''
    if (typeof Text === 'function') {
      Text = <Text {...col} />
    }

    return (
      <th
        key={col.field}
        data-width={width}
        onClick={Table.rowClick(col.clickTHeadCol, { event, col, colIdx })}
        style={{ width, textAlign, height: `${height}px` }}
      >
        {Text}
      </th>
    )
  }

  static Td = (props: {
    col: TColumn
    row: TData
    rowIdx?: number | string
    colIdx?: number
    colSpan?: number
    height: number
    indent?: number
    indentColumn?: string
    childrenColumn?: string
    hasChildren?: boolean
    isChildren?: boolean
  }) => {
    const {
      col,
      row,
      rowIdx,
      colIdx,
      height,
      colSpan,
      indent,
      indentColumn,
      hasChildren,
      isChildren
    } = props
    const width = col.width ? `${col.width * 100}%` : 'auto'
    const isExpandCol = hasChildren && indentColumn === col.field
    const textAlign = isExpandCol ? 'left' : col.align || 'center'

    // 处理JSX.Element
    let Text: React.ReactNode
    let RowItem: React.ReactNode
    if (col.field === 'index') {
      RowItem = col.handleIndex || rowIdx
    } else {
      RowItem = row[col.field] || ''
    }
    Text =
      typeof RowItem === 'function' ? (
        <RowItem rowIdx={rowIdx} colIdx={colIdx} {...row} indent={indent} />
      ) : (
        RowItem
      )

    // 控制tree的显示
    const onShowTree = Table.rowClick((param: any) => {
      let target = param.event.target
      while (true) {
        const nodeName = target.nodeName
        if (nodeName === 'TR' || nodeName === 'TABLE') {
          break
        }
        target = target.parentElement
      }

      const key = target.getAttribute('data-key')
      if (key) {
        const className = param.event.target.className || ''
        let expanded: boolean
        if (className.includes('expanded')) {
          expanded = true
          param.event.target.className = className
            .replace('expanded', '')
            .trim()
        } else {
          expanded = false
          param.event.target.className = `${className} expanded`
        }
        let trs = target.parentElement.querySelectorAll(
          `tr[data-key^='${key}-']`
        )
        trs = [].slice.call(trs, 0)
        trs.forEach((tr: any) => {
          if (expanded) {
            tr.style.display = ''
            tr.style.opacity = ''
          } else {
            const k = tr.getAttribute('data-key')
            if (isNaN(+k.replace(`${key}-`, ''))) {
              return
            }

            // 打开当前级
            tr.style.display = 'table-row'
            tr.style.opacity = 1

            // 检查子级是否需要打开
            const em = tr.querySelector('em.expanded')
            if (em) {
              const k = tr.getAttribute('data-key')
              trs
                .filter((tr: any) =>
                  tr.getAttribute('data-key').startsWith(`${k}-`)
                )
                .forEach((tr: any) => {
                  tr.style.display = 'table-row'
                  tr.style.opacity = 1
                })
            }
          }
        })
      }
    },                                {})

    return (
      <td
        key={col.field}
        colSpan={colSpan}
        style={{
          width,
          textAlign,
          height: `${height}px`,
          paddingLeft: isExpandCol ? `${indent}px` : ''
        }}
        onClick={Table.rowClick(col.clickTbodyCol, {
          event,
          row,
          col,
          rowIdx,
          colIdx
        })}
      >
        {isExpandCol ? (
          <em
            onClick={onShowTree}
            className={`${isChildren ? '' : 'hidden'} row-expand-icon mr5`}
          />
        ) : null}
        {Text}
      </td>
    )
  }

  // table tr
  static Tr = (props: {
    rowIdx?: number | string
    row?: TData
    clickRow?: (param: TClickRow) => void
    children: React.ReactNode
  }) => {
    const { rowIdx = 1, row = null, clickRow, children } = props

    return (
      <tr
        key={rowIdx}
        data-key={rowIdx}
        onClick={Table.rowClick(clickRow, { event, row, rowIdx })}
      >
        {children}
      </tr>
    )
  }

  // table Content
  static getContent = (props: {
    data: TData[]
    columns: TColumn[]
    rootRowIdx?: string
    height: number
    indent: number
    indentColumn: string
    childrenColumn: string
    clickTbodyRow: (param: TClickRow) => void
  }) => {
    const {
      data,
      columns,
      clickTbodyRow,
      height,
      rootRowIdx,
      childrenColumn,
      indent,
      indentColumn
    } = props
    const result: React.ReactNode[] = []

    const hasChildren = data.find(
      row =>
        row[childrenColumn] instanceof Array ||
        typeof row[childrenColumn] === 'function'
    )
    let indentCol: string = null
    if (hasChildren) {
      indentCol = indentColumn || columns[0].field
    }

    const handleTr = (data: TData[], rootIndent: number, rootRowIdx = '') => {
      data.forEach((row, rowIdx) => {
        let rootIdx: any = rowIdx + 1
        if (rootRowIdx) {
          rootIdx = `${rootRowIdx}-${rootIdx}`
        }

        const isChildren =
          row[childrenColumn] instanceof Array ||
          typeof row[childrenColumn] === 'function'

        result.push(
          <Table.Tr
            key={rootIdx}
            rowIdx={rootIdx}
            row={row}
            clickRow={clickTbodyRow}
          >
            {columns.map((col, colIdx) => (
              <Table.Td
                key={col.field}
                col={col}
                row={row}
                rowIdx={rootIdx}
                colIdx={colIdx}
                height={height}
                indent={rootIndent}
                indentColumn={indentCol}
                hasChildren={!!hasChildren}
                isChildren={isChildren}
              />
            ))}
          </Table.Tr>
        )

        // 最近children
        const SubItem = row[childrenColumn]
        if (SubItem instanceof Array) {
          handleTr(SubItem, rootIndent + indent, rootIdx)
        }
        if (typeof SubItem === 'function') {
          rootIdx = `${rootIdx}-1`
          const index = columns.findIndex(col => col.field === indentCol)

          result.push(
            <Table.Tr
              key={rootIdx}
              rowIdx={rootIdx}
              row={row}
              clickRow={clickTbodyRow}
            >
              {index > 0 ? (
                <Table.Td
                  col={{ field: indentCol }}
                  row={{}}
                  height={height}
                  colSpan={index}
                />
              ) : null}
              <Table.Td
                col={{ field: childrenColumn }}
                row={row}
                rowIdx={rootIdx}
                colSpan={columns.length - index}
                colIdx={1}
                height={height}
                indent={rootIndent + indent}
              />
            </Table.Tr>
          )
        }
      })
    }

    handleTr(data, 5, rootRowIdx)

    return result
  }

  // table empty
  static Empty = (props: {
    colSpan: number
    height: number
    content: string
  }) => {
    const { colSpan, height, content } = props

    return (
      <Table.Tr>
        <Table.Td
          col={{ field: 'empty' }}
          row={{ empty: content }}
          colSpan={colSpan}
          height={height}
        />
      </Table.Tr>
    )
  }

  // table head
  static Thead = (props: IPropsThead) => {
    const {
      columns,
      height,
      isBorder,
      clickTHeadRow,
      wrapperThead = ''
    } = props

    return (
      <div className={`${style.wrapperThead} ${wrapperThead} wp100 palt`}>
        <table className={`${isBorder ? 'border' : ''} no-wrap`}>
          <thead className="cb-table-thead">
            <Table.Tr clickRow={clickTHeadRow}>
              {columns.map((col, colIdx) => (
                <Table.Th
                  key={col.field}
                  col={col}
                  colIdx={colIdx}
                  height={height}
                />
              ))}
            </Table.Tr>
          </thead>
        </table>
      </div>
    )
  }

  // table tbody
  static Tbody = (props: IPropsTbody) => {
    const {
      columns,
      height,
      isBorder,
      indentColumn,
      data = [],
      clickTbodyRow,
      isWrap = false,
      empty = '暂无数据！',
      wrapperTbody = '',
      indent = 10,
      childrenColumn = 'children'
    } = props

    return (
      <div
        className={`${style.wrapperTbody} ${wrapperTbody} wp100 hp100 oay sb`}
      >
        <table
          className={`${!isWrap ? 'no-wrap' : ''} ${isBorder ? 'border' : ''}`}
        >
          <tbody>
            {data.length === 0 ? (
              <Table.Empty
                colSpan={columns.length}
                content={empty}
                height={height}
              />
            ) : (
              Table.getContent({
                data,
                columns,
                height,
                indent,
                indentColumn,
                childrenColumn,
                clickTbodyRow
              })
            )}
          </tbody>
        </table>
      </div>
    )
  }

  // current page change
  private onChangePage(currentPage: number, pageSize: number) {
    this.setState({ currentPage, pageSize })
    const { changePage } = this.props

    changePage && changePage(currentPage, pageSize)
  }

  // page size change
  private onChangePageSize(currentPage: number, pageSize: number) {
    this.setState({ pageSize, currentPage: 1 })

    const { changeSize } = this.props

    changeSize && changeSize(1, pageSize)
  }

  // 处理百分比
  private percentOfWidth(cols: TColumn[]) {
    const columns: TColumn[] = cols

    let total = 0
    const mins: number[] = []
    columns.forEach(col => col.width && mins.push(col.width))
    let min = Math.min(...mins)
    if (min === 0) {
      min = 100 / columns.length
    }

    columns.forEach((col: TColumn) => {
      const w = col.width || min
      col.width = w
      total += w
    })

    let percent = 0
    const exact = 1000
    columns.forEach((col, idx) => {
      if (idx === columns.length - 1) {
        return (col.width = Math.round((1 - percent) * exact) / exact)
      }
      col.width = Math.round((col.width / total) * exact) / exact
      percent += col.width
    })

    return columns
  }

  private setMinWidth() {
    const cbMinW: any = this._table.querySelector('.cb-min-width')
    const minW = parseInt(window.getComputedStyle(cbMinW, null).minWidth, 10)
    if (!isNaN(minW) && minW > 0) {
      return
    }

    // 获取最小宽度
    const ths = [].slice.call(
      this._table.querySelectorAll('.cb-table-thead th'),
      0
    )
    const ws: number[] = []
    ths.forEach((th: any) => {
      const ow = th.offsetWidth
      const sw = th.scrollWidth
      if (ow > sw) {
        return
      }

      // 处理出现省略号的情况
      const style = window.getComputedStyle(th, null)
      let bl = parseInt(style.borderLeftWidth, 10)
      bl = isNaN(bl) ? 0 : bl
      let br = parseInt(style.borderRightWidth, 10)
      br = isNaN(br) ? 0 : br
      let w = bl + br + sw
      const pw = parseInt(th.getAttribute('data-width'), 10)
      if (!isNaN(pw)) {
        w = (w * 100) / pw
      } else {
        w = w * this.props.columns.length
      }

      ws.push(Math.ceil(w))
    })

    // 设置最小宽度
    cbMinW.style.minWidth = `${Math.max(...ws)}px`
  }

  // 暴露api
  public api() {
    return {
      // setPage: (currentPage: number) => {
      //   this.setState({ currentPage })
      // }
    }
  }

  componentDidMount() {
    this.setMinWidth()
  }

  constructor(props: IPropsTable) {
    super(props)

    const { pageSizeOptions = this._pageSizeOptions } = props

    this.state = {
      currentPage: 1,
      pageSize: +pageSizeOptions[0]
    }

    this.onChangePage = this.onChangePage.bind(this)
    this.onChangePageSize = this.onChangePageSize.bind(this)
  }

  render() {
    const { currentPage, pageSize } = this.state

    const {
      empty,
      data,
      minWidth,
      wrapperThead,
      wrapperTbody,
      clickTHeadRow,
      clickTbodyRow,
      indentColumn,
      indent,
      childrenColumn,
      height = 36,
      loading = false,
      isBorder = true,
      wrapperTable = '',
      total = 0,
      pageSizeOptions = this._pageSizeOptions
    } = this.props

    const columns = this.percentOfWidth(this.props.columns)

    // 是否需要分页
    const isPage = total > +pageSizeOptions[0]

    return (
      <Loading spinning={loading}>
        <div
          ref={el => (this._table = el)}
          className={`${style.wrapperTable} ${wrapperTable} wp100 hp100 pr`}
          style={{
            paddingBottom: isPage ? '46px' : '10px'
          }}
        >
          <div className="scroll-x wp100 hp100 oax sb bsb">
            <div
              className="cb-min-width wp100 hp100 pr"
              style={{ paddingTop: `${height}px`, minWidth: `${minWidth}px` }}
            >
              <Table.Thead
                columns={columns}
                height={height}
                isBorder={isBorder}
                wrapperThead={wrapperThead}
                clickTHeadRow={clickTHeadRow}
              />
              <Table.Tbody
                indent={indent}
                indentColumn={indentColumn}
                childrenColumn={childrenColumn}
                empty={empty}
                height={height}
                isBorder={isBorder}
                columns={columns}
                wrapperTbody={wrapperTbody}
                clickTbodyRow={clickTbodyRow}
                data={data}
              />
            </div>
          </div>
          {/* 分页器 */}
          {!isPage ? null : (
            <div className={`${style.page} wp100 palb`}>
              <Pagination
                total={total}
                pageSize={pageSize}
                current={currentPage}
                pageSizeOptions={pageSizeOptions}
                showSizeChanger={true}
                showQuickJumper={true}
                onChange={this.onChangePage}
                onShowSizeChange={this.onChangePageSize}
              />
            </div>
          )}
        </div>
      </Loading>
    )
  }
}
