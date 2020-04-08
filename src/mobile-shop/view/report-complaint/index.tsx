import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Radio, TextareaItem, Button, Grid, Icon } from 'antd-mobile'

import { toast } from 'global@util/toast/mobile'
import Image from '../../component/image'
import { Header } from '../../component/header'
import Contact from '../../store/contact'
import { getFilesByAccept, E_ACCEPT_TYPE } from 'global@util/gallery-camera'
import {
  compressAndOrientationImage,
  fileOrBlob2Base64
} from 'global@util/file'
const style = require('./style')

enum E_REPORT_TYPE {
  ARTICLE = 'article', // 文章
  COMMENT = 'comment' // 评论
}
type TReportType = { label: string; value: E_REPORT_TYPE }
const reportTypes: TReportType[] = [
  { label: '文章', value: E_REPORT_TYPE.ARTICLE },
  { label: '评论', value: E_REPORT_TYPE.COMMENT }
]
const reportReasons: { label: string; value: string }[] = [
  // { label: '标题夸张', value: '标题夸张' },
  // { label: '低俗色情', value: '低俗色情' },
  // { label: '政治有害', value: '政治有害' },
  // { label: '错别字多', value: '错别字多' },
  // { label: '旧闻重复', value: '旧闻重复' },
  // { label: '广告软文', value: '广告软文' },
  // { label: '内容不实', value: '内容不实' },
  // { label: '涉嫌违法犯罪', value: '涉嫌违法犯罪' },
  // {
  //   label: '侵权(抄袭、侵犯名誉、侵犯肖像等)',
  //   value: '侵权(抄袭、侵犯名誉、侵犯肖像等)'
  // },
  // { label: '其他问题', value: '其他问题' }
  { label: '色情', value: '1' },
  { label: '欺诈', value: '2' },
  { label: '广告骚扰', value: '3' },
  { label: '敏感信息', value: '4' },
  { label: '侵权', value: '5' },
  { label: '赌博', value: '6' },
  { label: '其他', value: '7' }
]

interface IPropsReportComplaint extends RouteComponentProps {
  contact: Contact
}

interface IStateReportComplaint {
  reportType: E_REPORT_TYPE // 举报类型
  reportReason: string // 举报原因
  reportContent: string
  imgs: { file?: File; url?: string }[]
}

@inject('contact')
@observer
export default class ReportComplaint extends React.Component<
  IPropsReportComplaint,
  IStateReportComplaint
> {
  private async onSubmit() {
    const { reportReason, reportContent, imgs } = this.state
    if (!reportReason) {
      return toast.info('请选择投诉原因')
    }
    if (!reportContent) {
      return toast.info('请输入投诉内容')
    }
    const reportImgs = imgs.filter(i => !!i.file)
    if (reportImgs.length === 0) {
      return toast.info('请选择图片证据')
    }

    const param: any = this.props.match.params
    const data = new FormData()
    data.append('to_account_id', param.toId)
    data.append('type', reportReason)
    data.append('content', reportContent)
    reportImgs.forEach((i: any) => data.append('image[]', i.file))
    const result = await this.props.contact.report(data)
    const resData = result.data || {}
    if (resData.code === 200) {
      toast.info('提交成功，感谢你的支持！', 2, Header.goBack)
    }
  }

  private onDelImg(itm: any) {
    let { imgs } = this.state

    imgs = imgs.filter(img => img.file && img.file !== itm.file)
    this.setState({ imgs: [...imgs, {}] })
  }

  private onChangeImg() {
    getFilesByAccept(
      E_ACCEPT_TYPE.IMAGE,
      (err: Error, files: File[]) => {
        if (err) {
          return toast.info(err.message)
        }

        const file = files[0]
        const formats: string[] = ['png', 'jpg', 'jpeg']
        const name = file.name.toLowerCase()
        const valid = formats.find((format: string) => {
          return new RegExp(`^.+\.${format}$`).test(name)
        })
        if (!valid) {
          return toast.info(`图片格式为${formats.join('、')}`)
        }

        // 旋转 & 压缩图片
        compressAndOrientationImage(file, {}, (err: Error, f: File) => {
          fileOrBlob2Base64(err || !f ? file : f, (err: Error, base64: any) => {
            const state = { file, url: '' }
            if (!err && base64) {
              state.url = base64
            }
            const { imgs } = this.state
            imgs[imgs.length - 1] = state
            if (imgs.length < 3) {
              this.setState({ imgs: [...imgs, {}] })
            } else {
              this.setState({ imgs: [...imgs] })
            }
          })
        })
      },
      false
    )
  }

  constructor(props: IPropsReportComplaint) {
    super(props)

    this.state = {
      reportReason: '',
      reportContent: '',
      reportType: E_REPORT_TYPE.ARTICLE,
      imgs: [{}]
    }

    this.onChangeImg = this.onChangeImg.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render() {
    const { reportReason, imgs, reportContent } = this.state

    return (
      <div className="wp100 hp100 pr bsb pt50 fs0 bg-fff oh">
        <Header>举报投诉</Header>
        <div className="wp100 hp100 oay sb">
          {/* <div className={`${style.reportTitle} wp100 bsb`}>
            <div className="wp100 tes">
              <span className="mr10">文章标题:</span>
              珠海航展四川展区大放异彩获得众多客户青睐获得众多客户青睐
            </div>
            <div className="wp100">
              <span className="mr10">举报类型:</span>
              {reportTypes.map(type => (
                <Radio
                  key={type.value}
                  className="raido"
                  checked={reportType === type.value}
                  onChange={() => this.setState({ reportType: type.value })}
                >
                  {type.label}
                </Radio>
              ))}
            </div>
          </div> */}
          <div className={`${style.reportReason} wp100`}>
            <div className="title wp100 bsb plr10">请选择投诉原因</div>
            <div className="cb-radio wp100 bsb plr10">
              {reportReasons.map((reason: any) => (
                <Radio.RadioItem
                  key={reason.value}
                  checked={reportReason === reason.value}
                  onClick={() =>
                    this.setState({
                      reportReason:
                        reason.value === reportReason ? '' : reason.value
                    })
                  }
                >
                  {reason.label}
                </Radio.RadioItem>
              ))}
            </div>
          </div>
          <div className={`${style.reportAdd} wp100`}>
            <div className="title wp100 bsb plr10">请输入投诉内容</div>
            <div className="cb-input wp100 plr10 bsb">
              <TextareaItem
                maxLength={200}
                placeholder="请输入200字以内的投诉内容"
                value={reportContent}
                onChange={val => this.setState({ reportContent: val.trim() })}
              />
            </div>
          </div>
          <div className={`${style.reportImgs} wp100`}>
            <div className="title wp100 bsb plr10">
              请上传图片证据
              <span className="fr">
                {imgs.filter(m => !!m.file).length}/3张
              </span>
            </div>
            <div className="imgs-wrap wp100 p5 bsb">
              <Grid
                data={imgs}
                columnNum={3}
                square={true}
                hasLine={false}
                activeStyle={false}
                renderItem={img => (
                  <div className="item-img wp100 hp100">
                    {img.file ? (
                      <div className="has-img wp100 hp100 pr">
                        <Image className="wp100 hp100" url={img.url} />
                        <div className="palt wp100 hp100">
                          <Icon
                            className="mc"
                            type="cross-circle"
                            size="lg"
                            color="#fff"
                            onClick={() => this.onDelImg(img)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="empty-img wp100 hp100 pr"
                        onClick={this.onChangeImg}
                      >
                        <Icon
                          className="mc"
                          type="cross-circle"
                          size="lg"
                          color="#999"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className={`${style.reportXz} wp100`}>
            <div className="title wp100 bsb plr10">投诉须知</div>
            <div className="content wp100 ti2 bsb fs12">
              你应保证你的举报投诉行为基于善意，并代表你本人真实意愿。铭信达公司作为中立的平台服务者，
              收到你的投诉后，会尽快按照相关法律法规独立判断并进行处理。铭信达公司将会采取合理的措施
              保护你的个人信息；除法律法规规定的情形外，未经用户许可铭信达公司不会向第三方公开、透露
              你的个人信息。
            </div>
          </div>
          <div className={`${style.reportBtn} wp100`}>
            {/* <div className="title wp100 bsb plr10">
              <em
                style={{
                  backgroundImage: `url(${require('../../assets/images/info-icon.png')})`
                }}
              />
              <span className="mr5">注:</span>
              请如实投诉举报，48小时内反馈处理结果。
            </div> */}
            <div className="cb-btn wp100 bsb">
              <Button onClick={this.onSubmit}>提交</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
