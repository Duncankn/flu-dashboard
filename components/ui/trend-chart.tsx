import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FluData } from '@/types/flu';
import { parse, format } from 'date-fns';

interface TrendChartProps {
  data: FluData[];
}

export function TrendChart({ data }: TrendChartProps) {
    // Function to parse different date formats
    const parseDate = (dateString: string) => {
    // Remove any surrounding quotes if present
        dateString = dateString.replace(/['"]/g, '');
    
        // Try parsing different date formats
        const date = new Date(dateString);
        //console.log(date.toLocaleDateString());
    
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            // Handle specific format like "DD-MM-YYYY" or "DD/MM/YYYY"
            const parts = dateString.split(/[-/]/);
            if (parts.length === 3) {
            // Assuming DD-MM-YYYY or DD/MM/YYYY format
                return new Date(
                    parseInt(parts[2]), // year
                    parseInt(parts[1]) - 1, // month (0-based)
                    parseInt(parts[0]) // day
                );
            }
            // Return a default date if parsing fails
            console.warn(`Unable to parse date: ${dateString}`);
            return new Date();
        } else {
            const parsedDate = parse(dateString, 'M/d/yyyy', new Date());
            const formattedDate = format(parsedDate, 'd/M/yyyy');
            const date = new Date(formattedDate);
            return date;
        }
    };

    const parseNumber = (value: string | number | undefined): number | null => {
        // Remove any quotes and trim whitespace
        if (typeof value === 'string') {
          value = value.replace(/['"]/g, '').trim();
        }
        
        // Handle empty or undefined values
        if (value === undefined || value === null || value === '') {
          return null;
        }
    
        // Convert to number
        const num = Number(value);
        
        // Check if it's a valid number
        if (isNaN(num)) {
          console.warn(`Invalid number value: ${value}`);
          return null;
        }
    
        return num;
      };

    const formatDate = (dateString: string) => {
        try {
            const date = parseDate(dateString);
            return date.toLocaleDateString('zh-HK', { 
                year: '2-digit',
                month: 'short', 
                day: 'numeric' 
            });
        } catch (error) {
            console.warn(`Error formatting date: ${dateString}`, error);
            return dateString;
        }
    };

    const formatTooltipValue = (value: string | number , name: string) => {
        if (value === null || value === undefined ) {
            return ['無數據', name];
        }
        return [`${Number(value).toFixed(2)}%`, name];
    };

    // Transform and clean data
    const processedData = data.map(item => ({
        ...item,
        From: parseDate(item.From).toLocaleDateString('zh-HK'),
        ILI_GOPC: parseNumber(item.ILI_GOPC),
        ILI_PMP: parseNumber(item.ILI_PMP)
    })).filter(item => {
        // Filter out items where both values are null
        return item.ILI_GOPC !== null || item.ILI_PMP !== null;
    });

    return (
        <Card className="mb-6">
          <CardHeader className="space-y-1">
            <CardTitle>流感趨勢（過去2年）</CardTitle>
            <p className="text-sm text-muted-foreground">按診所類別統計的流感樣疾病求診率</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart
                  data={processedData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="From" 
                    tickFormatter={formatDate} 
                    stroke="#888888" 
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis 
                    stroke="#888888"
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    labelFormatter={formatDate}
                    formatter={formatTooltipValue}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #f0f0f0',
                      borderRadius: '6px',
                      padding: '8px'
                    }}
                    itemStyle={{ color: '#000' }}
                    labelStyle={{ color: '#000' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ILI_GOPC" 
                    stroke="#2563eb" 
                    name="普通科門診"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    connectNulls={true}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ILI_PMP" 
                    stroke="#dc2626" 
                    name="私家醫生"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    connectNulls={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      );
}