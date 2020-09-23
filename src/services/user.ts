import request from '@/utils/request';

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
