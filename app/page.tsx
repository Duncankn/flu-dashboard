'use client';

import { Activity, Users, Building, School, AlertTriangle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFluData } from '@/hooks/useFluData';
import { StatCard } from '@/components/ui/StatCard';
import { TrendChart } from '@/components/ui/trend-chart';
import { AdSense } from '@/components/ui/adsense';
import { CasesChart } from '@/components/ui/cases-chart';
import Footer from '@/components/footer';


export default function Home() {
  const { data: fluData, error, isLoading } = useFluData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 mr-2 text-blue-500" />
        載入中...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
            無法加載數據。請稍後再試。
        </AlertDescription>
      </Alert>
    );
  }

  const recentData = fluData?.slice(-104) || [];
  const latestData = recentData[recentData.length - 1];
  const previousData = recentData[recentData.length - 2];

  const gopcChange = latestData && previousData 
    ? ((latestData.ILI_GOPC - previousData.ILI_GOPC) / previousData.ILI_GOPC * 100).toFixed(1)
    : '0';

  const getAlertLevel = (iliGopc: number) => {
    if (iliGopc > 10) return '高';
    if (iliGopc > 5) return '中';
    return '低';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Ad */}
      <div>
        <AdSense client="ca-pub-8470057760537876" slot="3111011978" />
      </div>
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">香港流感監測儀表板</h1>
        <p className="text-gray-600">最後更新：{latestData?.To || '載入中'}</p>
        <p className="text-gray-600">資料來源：衛生署</p>
      </div>

      {/* Alert */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          目前流感活躍程度：{latestData ? getAlertLevel(latestData.ILI_GOPC) : '載入中'} - 請注意個人衛生，保持社交距離
        </AlertDescription>
      </Alert>

      <div>
        <p>香港流感監測平台旨在提供實時的流感病例數據和趨勢分析，幫助用戶了解香港的流感情況。</p>

        <h2>香港流感監測簡介</h2>
        <p>流感是一種常見的呼吸道疾病，會對個人健康和公共衛生造成重大影響。香港作為一個國際金融中心和旅遊熱點，人口密度高，流感的傳播風險較高。因此，有效的流感監測系統對於預防和控制流感爆發至關重要。</p>

        <h2>流感監測的重要性</h2>
        <p>1. **早期發現和預警**：透過實時監測流感病例，可以早期發現潛在的流感爆發，並及時發出預警，幫助政府和醫療機構採取預防措施。</p>
        <p>2. **疫苗接種策略**：監測數據有助於評估疫苗的有效性，並指導疫苗接種策略，確保高風險人群獲得充分保護。</p>
        <p>3. **公共衛生政策制定**：流感監測數據為公共衛生政策提供依據，幫助政府制定有效的防控措施，減少流感對社會的影響。</p>

        <h2>香港流感監測系統</h2>
        <p>香港的流感監測系統主要依賴以下幾個關鍵組成部分：</p>
        <p>1. **醫院和門診報告系統**：各大醫院和門診會定期向衞生署報告流感病例，提供實時數據。</p>
        <p>2. **實驗室檢測**：透過實驗室檢測確認流感病毒類型，幫助跟蹤病毒的演變。</p>
        <p>3. **社區監測**：透過社區監測網絡收集流感相關數據，了解病毒在社區的傳播情況。</p>

        <h2>數據可視化與分析</h2>
        <p>為了更好地理解流感監測數據，我們使用數據可視化技術來呈現數據趨勢和分布情況。透過交互式圖表和地圖，使用者可以直觀地看到流感病例的變化，了解不同地區的流感風險，並跟蹤病毒的傳播路徑。</p>
      </div>

      {/* Statistic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="門診求診率"
          value={`${latestData?.ILI_GOPC.toFixed(1)}%`}
          subtitle={`較上週${Number(gopcChange) > 0 ? '上升' : '下降'} ${Math.abs(Number(gopcChange))}%`}
          icon={Activity}
          iconColor="text-blue-500"
        />
        <StatCard
          title="住院病例"
          value={latestData?.Adm_All.toFixed(1)}
          subtitle="每萬人口住院率"
          icon={Users}
          iconColor="text-red-500"
        />
        <StatCard
          title="院舍爆發"
          value={latestData?.ILI_NonSchool}
          subtitle="本週爆發個案"
          icon={Building}
          iconColor="text-yellow-500"
        />
        <StatCard
          title="學校爆發"
          value={latestData?.ILI_School}
          subtitle="本週爆發個案"
          icon={School}
          iconColor="text-green-500"
        />
      </div>

      {/* Trending chart */}
      <TrendChart data={recentData} />

      {/* Trending chart */}
      <CasesChart data={recentData} />

      {/* Ad */}
      <div>
        <AdSense client="ca-pub-8470057760537876" slot="6458621231" />
      </div>
      <Footer />
    </div>
  );
}