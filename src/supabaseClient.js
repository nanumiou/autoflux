// Supabase 클라이언트 설정
import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정 (환경변수 사용)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 관리자 UUID (대시보드에 표시할 관리자 ID)
export const ADMIN_UUID = process.env.REACT_APP_ADMIN_UUID;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase 환경변수가 설정되지 않았습니다. .env 파일이나 배포 환경변수를 확인해주세요.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
