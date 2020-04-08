require('pinyin4js')
const { PinyinHelper, PinyinFormat }: any = window

export interface ISortItem {
  upper: string // 大写字母
  lower: string // 小写字母
  data: any[] // 排序后的数据
}

export interface IPreSortData {
  key: string // 按什么key排序
  data: { [propName: string]: any }[] // 需要排序数据
}

/**
 * 中文按字母分类排序
 * @param {IPreSortData | Array<string>} preSortData 需要排序的参数
 * @returns {Array<ISortItem>} 排序结果
 */
export const zhSort = (
  preSortData: IPreSortData | string[],
  incluEmpty: boolean = false
): ISortItem[] => {
  // 初始化排序后的数据结构
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const letterObj: { [propName: string]: any[] } = {}
  letters.forEach(letter => (letterObj[letter] = []))
  const invalid = '*'
  const invalidData: any[] = []
  const sortResult: ISortItem[] = []

  // 初始化排序数据
  let key = ''
  let preData = []
  if (preSortData instanceof Array) {
    preData = preSortData
  } else {
    key = preSortData.key
    preData = preSortData.data
  }

  // 按字母分类
  preData.forEach((itm: any) => {
    const val = key ? itm[key] : itm
    if (typeof val !== 'string') {
      return
    }
    // 中文转拼音
    const pinyin =
      PinyinHelper.convertToPinyinString(val, '', PinyinFormat.WITHOUT_TONE) ||
      ''
    // 获取中文首字母
    const firstLetter = pinyin.slice(0, 1).toLowerCase()
    const data = letterObj[firstLetter]

    if (!data) {
      return invalidData.push({ py: val, data: itm })
    } // 当前字母无效直接过滤掉
    data.push({ py: pinyin, data: itm })
  })

  const sortZh = (obj: any) => {
    Object.keys(obj).forEach((letter: string) => {
      const data = obj[letter].sort((a: any, b: any) =>
        a.py < b.py ? -1 : a.py > b.py ? 1 : 0
      )
      if (data.length === 0 && !incluEmpty) {
        return
      }
      sortResult.push({
        data: data.map((item: any) => item.data),
        lower: letter.toLowerCase(),
        upper: letter.toUpperCase()
      })
    })
  }

  // 根据拼音排序
  sortZh(letterObj)

  if (invalidData.length !== 0) {
    sortZh({ [invalid]: invalidData })
  }

  return sortResult
}
