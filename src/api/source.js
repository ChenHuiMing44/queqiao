/**
 * @author: hm, 2022/5/9
 * des: 请求支援接口
 */
import request from '@/utils/request'

export default {
  /**
   * @author: hm, 2022/5/9
   * des: 资源共享列表
   */
  shardList: (params) => request.get('/source/shared_list', params),

  /**
   * @author: hm, 2022/5/9
   * des: source-list
   */
  sourceList: (params) => request.get('/source/list', params),

  /**
   * @author: hm, 2022/5/9
   * des: 项目详情
   */
  sourceDetail: (params) => request.get('/source/detail', params)
}
