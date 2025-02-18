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