import { getPlus } from '../plus'
import { PHONE_REG } from '../../constant'

// 通讯录类型
export enum E_CONTACT_TYPE {
  PHONE = 'ADDRESSBOOK_PHONE', // 手机通讯录
  SIM = 'ADDRESSBOOK_SIM' // SIM卡通讯录
}

/**
 * 获取通讯录对象
 * @param {E_CONTACT_TYPE} type 通讯录类型
 * @returns {Promise} Promise对象
 */
const getAddressBook = (type: E_CONTACT_TYPE = E_CONTACT_TYPE.PHONE) =>
  new Promise((resolve, reject) => {
    getPlus()
      .then((plus: any) => {
        plus.contacts.getAddressBook(plus.contacts[type], resolve, reject)
      })
      .catch(reject)
  })

/**
 * 读取通讯录联系人
 * @param {E_CONTACT_TYPE} type 通讯录类型
 * @param {boolean} isSort 是否排序
 * @returns {Promise} Promise对象
 * {
 * "id":1,
 * "rawId":null,
 * "target":0,
 * "displayName":"翠姐",
 * "name":{"familyName":"翠","givenName":"姐","formatted":"姐 翠 "},
 * "nickname":null,
 * "phoneNumbers":[{"id":"2","pref":false,"value":"18009080104","type":"mobile"}],
 * "emails":[],
 * "addresses":[],
 * "ims":[],
 * "organizations":[],
 * "birthday":null,
 * "note":null,
 * "photos":[],
 * "categories":null,
 * "urls":[]
 * }
 */
// export const getContacts = (
//   type: E_CONTACT_TYPE = E_CONTACT_TYPE.PHONE,
//   isSort: boolean = false
// ) =>
//   new Promise((resolve, reject) => {
//     // 缓存key
//     const contactKey = 'CONTACTS_SORT'
//     // 使用排序后的缓存数据
//     const cacheContacts = session.get(contactKey)
//     if (isSort && cacheContacts) {
//       console.log('缓存')
//       return resolve(cacheContacts)
//     }

//     getAddressBook(type)
//       .then((book: any) => {
//         book.find(
//           [], // 返回联系人中的字段， '' | null | [] 所有字段
//           (contacts: any[] = []) => {
//             console.log('获取通讯录')
//             if (!isSort) {
//               return resolve(contacts)
//             }

//             /************ 排序 ***********/
//             // 获取有效数据
//             const validContacts = contacts.filter(
//               (contact: any) => !!contact.displayName
//             )

//             // 根据displayName排序
//             const sortContacts = zhSort({
//               key: 'displayName',
//               data: validContacts
//             })

//             // 设置缓存
//             session.set(contactKey, sortContacts)

//             // 响应
//             resolve(sortContacts)
//           },
//           reject
//         ) // 错误回调
//       })
//       .catch(reject)
//   })

export const getContacts = (type: E_CONTACT_TYPE = E_CONTACT_TYPE.PHONE) =>
  new Promise((resolve, reject) => {
    getAddressBook(type)
      .then((book: any) => {
        book.find(
          ['displayName', 'phoneNumbers'],
          (contacts: any) => {
            let cts: any[] = []
            if (contacts instanceof Array) {
              cts = contacts
            } else {
              alert(JSON.stringify(contacts))
            }
            const ctts: any[] = []
            cts.forEach((c: any, i: any) => {
              if (!c.id || !c.displayName) {
                return
              }
              const ms: any[] = []
              const nbs = c.phoneNumbers || []
              nbs.forEach((p: any, i: any) => {
                let value = (p.value || '').match(/\d+/g) || []
                value = value.join('')
                PHONE_REG.test(value) && ms.push(`${value}`)
              })
              ms.length > 0 &&
                ctts.push({
                  cid: c.id,
                  name: c.displayName,
                  mobiles: ms,
                  head_img: c.photos instanceof Array ? c.photos[0] || '' : ''
                })
            })
            // 响应
            resolve(ctts)
          },
          reject, // 错误回调
          {
            multiple: true
          }
        )
      })
      .catch(reject)
  })
