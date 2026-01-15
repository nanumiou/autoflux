// Supabase 클라이언트 설정
import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트 설정 (공개 환경변수 사용)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://owuvdxpylagerkwmnkif.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dXZkeHB5bGFnZXJrd21ua2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjc5NzIsImV4cCI6MjA4MzkwMzk3Mn0.awr-ps435WiLcJHiQi9h86W21RgB3oOnz-oZtGQ1n5U';

// 관리자 UUID (대시보드에 표시할 관리자 ID)
export const ADMIN_UUID = process.env.REACT_APP_ADMIN_UUID || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
