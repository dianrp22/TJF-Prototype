'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  FileText
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────
// DUMMY DATA — semua field ini adalah GA4 dimension/metric name
// Saat integrasi: ganti dengan response dari GA4 Data API
// ─────────────────────────────────────────────────────────────────

type Range = '7d' | '30d' | '90d';

const VISITORS_7D = [
  { date: '12 Jun', users: 312, sessions: 448 },
  { date: '13 Jun', users: 278, sessions: 401 },
  { date: '14 Jun', users: 390, sessions: 561 },
  { date: '15 Jun', users: 445, sessions: 638 },
  { date: '16 Jun', users: 521, sessions: 749 },
  { date: '17 Jun', users: 398, sessions: 571 },
  { date: '18 Jun', users: 467, sessions: 672 }
];

const VISITORS_30D = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(2026, 4, 20 + i);
  const base = 300 + Math.sin(i * 0.6) * 120 + Math.random() * 80;
  return {
    date: `${d.getDate()} ${d.toLocaleString('id-ID', { month: 'short' })}`,
    users: Math.round(base),
    sessions: Math.round(base * 1.44)
  };
});

const VISITORS_90D = Array.from({ length: 12 }, (_, i) => {
  const base = 2800 + i * 180 + Math.sin(i * 0.8) * 400;
  return {
    date: `Minggu ${i + 1}`,
    users: Math.round(base),
    sessions: Math.round(base * 1.44)
  };
});

const VISITORS: Record<Range, typeof VISITORS_7D> = {
  '7d': VISITORS_7D,
  '30d': VISITORS_30D,
  '90d': VISITORS_90D
};

// ga4: sessionSource / sessionMedium
const TRAFFIC_SOURCES = [
  { name: 'Organic Search', value: 5832, color: '#3b82f6' },
  { name: 'Direct', value: 3641, color: '#10b981' },
  { name: 'Social Media', value: 2318, color: '#f59e0b' },
  { name: 'Referral', value: 1056, color: '#8b5cf6' }
];

// ga4: deviceCategory
const DEVICES = [
  { name: 'Desktop', value: 58, color: '#3b82f6' },
  { name: 'Mobile', value: 36, color: '#10b981' },
  { name: 'Tablet', value: 6, color: '#f59e0b' }
];

// ga4: pagePath · screenPageViews · avgSessionDuration · engagementRate
const TOP_PAGES = [
  {
    path: '/id',
    title: 'Beranda',
    views: 7832,
    avgTime: '2m 41s',
    engagement: '68%'
  },
  {
    path: '/id/publication',
    title: 'Publikasi',
    views: 6214,
    avgTime: '3m 12s',
    engagement: '74%'
  },
  {
    path: '/id/initiatives',
    title: 'Inisiatif',
    views: 5103,
    avgTime: '2m 58s',
    engagement: '71%'
  },
  {
    path: '/id/topic',
    title: 'Topik Pengetahuan',
    views: 4421,
    avgTime: '2m 05s',
    engagement: '62%'
  },
  {
    path: '/id/research',
    title: 'Riset',
    views: 3897,
    avgTime: '3m 44s',
    engagement: '78%'
  },
  {
    path: '/id/news',
    title: 'Berita',
    views: 3542,
    avgTime: '1m 52s',
    engagement: '58%'
  },
  {
    path: '/id/about',
    title: 'Tentang Kami',
    views: 2186,
    avgTime: '1m 38s',
    engagement: '54%'
  },
  {
    path: '/id/initiatives/peatland-resto',
    title: 'Restorasi Gambut',
    views: 1743,
    avgTime: '4m 02s',
    engagement: '83%'
  }
];

// ga4: city · region · totalUsers
const GEO = [
  { city: 'Jakarta', region: 'DKI Jakarta', pct: 29.9 },
  { city: 'Bogor', region: 'Jawa Barat', pct: 12.7 },
  { city: 'Surabaya', region: 'Jawa Timur', pct: 9.99 },
  { city: 'Bandung', region: 'Jawa Barat', pct: 8.57 },
  { city: 'Palembang', region: 'Sumatera Selatan', pct: 6.79 },
  { city: 'Pontianak', region: 'Kalimantan Barat', pct: 5.76 },
  { city: 'Pekanbaru', region: 'Riau', pct: 4.88 }
];

const KPI_7D = {
  users: 2811,
  sessions: 4040,
  pageviews: 11924,
  bounceRate: 42.1,
  delta: { users: +12, sessions: +15, pageviews: +11, bounce: -3 }
};
const KPI_30D = {
  users: 12847,
  sessions: 18392,
  pageviews: 54231,
  bounceRate: 41.8,
  delta: { users: +18, sessions: +22, pageviews: +15, bounce: -5 }
};
const KPI_90D = {
  users: 38210,
  sessions: 54842,
  pageviews: 161437,
  bounceRate: 43.4,
  delta: { users: +31, sessions: +34, pageviews: +28, bounce: -2 }
};
const KPI: Record<Range, typeof KPI_7D> = {
  '7d': KPI_7D,
  '30d': KPI_30D,
  '90d': KPI_90D
};

// ─────────────────────────────────────────────────────────────────

function Delta({ v, invert = false }: { v: number; invert?: boolean }) {
  const good = invert ? v < 0 : v > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-bold ${good ? 'text-emerald-600' : 'text-red-500'}`}
    >
      {good ? (
        <TrendingUp className='w-3 h-3' />
      ) : (
        <TrendingDown className='w-3 h-3' />
      )}
      {v > 0 ? '+' : ''}
      {v}%
    </span>
  );
}

const RANGE_LABELS: Record<Range, string> = {
  '7d': '7 Hari',
  '30d': '30 Hari',
  '90d': '90 Hari'
};
const PIE_RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: any) => {
  if (percent < 0.07) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  return (
    <text
      x={cx + r * Math.cos(-midAngle * PIE_RADIAN)}
      y={cy + r * Math.sin(-midAngle * PIE_RADIAN)}
      fill='white'
      textAnchor='middle'
      dominantBaseline='central'
      fontSize={11}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardPage() {
  const [range, setRange] = useState<Range>('30d');
  const kpi = KPI[range];
  const visitors = VISITORS[range];

  return (
    <div className='px-8 py-8 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h1 className='text-2xl font-black text-gray-900'>Overview</h1>
          <p className='text-gray-500 text-sm mt-0.5'>
            Analitik website TJF · Data dummy · Siap integrasi Google Analytics
            4
          </p>
        </div>
        <div className='flex items-center gap-1 bg-gray-100 rounded-xl p-1'>
          {(['7d', '30d', '90d'] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                range === r
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      {/* GA4 notice */}
      <div className='flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-xs text-blue-700 font-medium'>
        <Globe className='w-3.5 h-3.5 flex-shrink-0' />
        Siap integrasi GA4 Data API · Property ID:{' '}
        <span className='font-black ml-1'>GA_MEASUREMENT_ID</span>
        <span className='ml-auto text-blue-400'>
          Semua metrik dipetakan ke GA4 dimension/metric standar
        </span>
      </div>

      {/* KPI Cards */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          {
            label: 'Total Pengguna',
            value: kpi.users.toLocaleString('id'),
            delta: kpi.delta.users,
            icon: Users,
            sub: 'ga4: totalUsers'
          },
          {
            label: 'Sesi',
            value: kpi.sessions.toLocaleString('id'),
            delta: kpi.delta.sessions,
            icon: MousePointerClick,
            sub: 'ga4: sessions'
          },
          {
            label: 'Halaman Dilihat',
            value: kpi.pageviews.toLocaleString('id'),
            delta: kpi.delta.pageviews,
            icon: Eye,
            sub: 'ga4: screenPageViews'
          },
          {
            label: 'Bounce Rate',
            value: `${kpi.bounceRate}%`,
            delta: kpi.delta.bounce,
            icon: TrendingDown,
            sub: 'ga4: bounceRate',
            invert: true
          }
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className='bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start justify-between mb-3'>
                <div className='w-9 h-9 bg-tjf-blue-pale rounded-xl flex items-center justify-center'>
                  <Icon className='w-4 h-4 text-tjf-blue' />
                </div>
                <Delta v={c.delta} invert={c.invert} />
              </div>
              <div className='text-2xl font-black text-gray-900'>{c.value}</div>
              <div className='text-xs text-gray-500 font-medium mt-0.5'>
                {c.label}
              </div>
              <div className='text-[10px] text-gray-300 mt-1 font-mono'>
                {c.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tren Pengunjung + Sumber Traffic */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-sm font-black text-gray-900'>
                Tren Pengunjung
              </h2>
              <p className='text-[10px] text-gray-400 font-mono mt-0.5'>
                ga4: date · totalUsers · sessions
              </p>
            </div>
            <div className='flex items-center gap-3 text-xs'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-tjf-blue' />
                Pengguna
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-emerald-400' />
                Sesi
              </span>
            </div>
          </div>
          <ResponsiveContainer width='100%' height={220}>
            <AreaChart
              data={visitors}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id='gUsers' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.15} />
                  <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='gSessions' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#10b981' stopOpacity={0.12} />
                  <stop offset='95%' stopColor='#10b981' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' />
              <XAxis
                dataKey='date'
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={false}
                interval='preserveStartEnd'
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  fontSize: 12
                }}
              />
              <Area
                type='monotone'
                dataKey='users'
                stroke='#3b82f6'
                strokeWidth={2}
                fill='url(#gUsers)'
                name='Pengguna'
              />
              <Area
                type='monotone'
                dataKey='sessions'
                stroke='#10b981'
                strokeWidth={2}
                fill='url(#gSessions)'
                name='Sesi'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white border border-gray-100 rounded-2xl p-5'>
          <h2 className='text-sm font-black text-gray-900'>Sumber Traffic</h2>
          <p className='text-[10px] text-gray-400 font-mono mt-0.5'>
            ga4: sessionSource / sessionMedium
          </p>
          <ResponsiveContainer width='100%' height={160}>
            <PieChart>
              <Pie
                data={TRAFFIC_SOURCES}
                cx='50%'
                cy='50%'
                innerRadius={44}
                outerRadius={72}
                dataKey='value'
                labelLine={false}
                label={renderCustomLabel}
              >
                {TRAFFIC_SOURCES.map((s, i) => (
                  <Cell key={i} fill={s.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) =>
                  typeof v === 'number' ? v.toLocaleString('id') : v
                }
                contentStyle={{ borderRadius: 10, fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className='space-y-1.5 mt-1'>
            {TRAFFIC_SOURCES.map((s) => (
              <li
                key={s.name}
                className='flex items-center justify-between text-xs'
              >
                <span className='flex items-center gap-1.5'>
                  <span
                    className='w-2 h-2 rounded-full flex-shrink-0'
                    style={{ background: s.color }}
                  />
                  <span className='text-gray-600'>{s.name}</span>
                </span>
                <span className='font-bold text-gray-800'>
                  {s.value.toLocaleString('id')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Halaman Teratas + Perangkat + Geo */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h2 className='text-sm font-black text-gray-900'>
                Halaman Teratas
              </h2>
              <p className='text-[10px] text-gray-400 font-mono mt-0.5'>
                ga4: pagePath · screenPageViews · avgSessionDuration ·
                engagementRate
              </p>
            </div>
            <FileText className='w-4 h-4 text-gray-300' />
          </div>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-100'>
                <th className='text-left text-[10px] font-bold text-gray-400 uppercase tracking-wide pb-2'>
                  Halaman
                </th>
                <th className='text-right text-[10px] font-bold text-gray-400 uppercase tracking-wide pb-2'>
                  Views
                </th>
                <th className='text-right text-[10px] font-bold text-gray-400 uppercase tracking-wide pb-2 hidden sm:table-cell'>
                  Avg. Time
                </th>
                <th className='text-right text-[10px] font-bold text-gray-400 uppercase tracking-wide pb-2 hidden sm:table-cell'>
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {TOP_PAGES.map((p) => (
                <tr
                  key={p.path}
                  className='hover:bg-gray-50/50 transition-colors'
                >
                  <td className='py-2.5 pr-4'>
                    <div className='text-xs font-semibold text-gray-800 truncate max-w-[200px]'>
                      {p.title}
                    </div>
                    <div className='text-[10px] text-gray-400 font-mono truncate max-w-[200px]'>
                      {p.path}
                    </div>
                  </td>
                  <td className='py-2.5 text-right'>
                    <span className='text-xs font-black text-gray-900'>
                      {p.views.toLocaleString('id')}
                    </span>
                  </td>
                  <td className='py-2.5 text-right hidden sm:table-cell'>
                    <span className='flex items-center justify-end gap-1 text-xs text-gray-500'>
                      <Clock className='w-3 h-3' />
                      {p.avgTime}
                    </span>
                  </td>
                  <td className='py-2.5 text-right hidden sm:table-cell'>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        parseInt(p.engagement) >= 70
                          ? 'bg-emerald-50 text-emerald-700'
                          : parseInt(p.engagement) >= 60
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {p.engagement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='bg-white border border-gray-100 rounded-2xl p-5'>
            <h2 className='text-sm font-black text-gray-900'>Perangkat</h2>
            <p className='text-[10px] text-gray-400 font-mono mt-0.5'>
              ga4: deviceCategory
            </p>
            <div className='mt-4 space-y-3'>
              {DEVICES.map((d) => {
                const Icon =
                  d.name === 'Desktop'
                    ? Monitor
                    : d.name === 'Mobile'
                      ? Smartphone
                      : Tablet;
                return (
                  <div key={d.name}>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='flex items-center gap-1.5 text-xs text-gray-600 font-medium'>
                        <Icon
                          className='w-3.5 h-3.5'
                          style={{ color: d.color }}
                        />{' '}
                        {d.name}
                      </span>
                      <span className='text-xs font-black text-gray-900'>
                        {d.value}%
                      </span>
                    </div>
                    <div className='h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className='h-full rounded-full transition-all duration-500'
                        style={{ width: `${d.value}%`, background: d.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='bg-white border border-gray-100 rounded-2xl p-5 flex-1'>
            <h2 className='text-sm font-black text-gray-900'>
              Lokasi Pengunjung
            </h2>
            <p className='text-[10px] text-gray-400 font-mono mt-0.5'>
              ga4: city · region · totalUsers
            </p>
            <ul className='space-y-2 mt-4'>
              {GEO.map((g, i) => (
                <li key={g.city} className='flex items-center gap-2'>
                  <span className='text-[10px] font-black text-gray-300 w-4 text-right'>
                    {i + 1}
                  </span>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs font-semibold text-gray-700 truncate'>
                        {g.city}
                      </span>
                      <span className='text-xs font-black text-gray-900 ml-2'>
                        {g.pct}%
                      </span>
                    </div>
                    <div className='text-[10px] text-gray-400 truncate'>
                      {g.region}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bar Chart Views */}
      <div className='bg-white border border-gray-100 rounded-2xl p-5'>
        <h2 className='text-sm font-black text-gray-900'>
          Views per Halaman Utama
        </h2>
        <p className='text-[10px] text-gray-400 font-mono mt-0.5 mb-4'>
          ga4: pagePath · screenPageViews
        </p>
        <ResponsiveContainer width='100%' height={180}>
          <BarChart
            data={TOP_PAGES.slice(0, 7)}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#f1f5f9'
              vertical={false}
            />
            <XAxis
              dataKey='title'
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 12
              }}
            />
            <Bar
              dataKey='views'
              name='Views'
              radius={[6, 6, 0, 0]}
              fill='#3b82f6'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Panduan Integrasi GA4 */}
      {/* <div className="bg-slate-900 rounded-2xl p-5 text-xs text-slate-400 font-mono">
        <p className="text-slate-200 font-bold text-sm mb-2 font-sans">🔌 Panduan Integrasi GA4</p>
        <p className="mb-1">1. Buat GA4 Property → dapatkan <span className="text-amber-400">MEASUREMENT_ID</span> (G-XXXXXXXXXX)</p>
        <p className="mb-1">2. Install <span className="text-blue-400">@next/third-parties/google</span> → tambah <span className="text-blue-400">{"<GoogleAnalytics gaId=\"G-XXX\" />"}</span> ke layout.tsx</p>
        <p className="mb-1">3. Aktifkan <span className="text-blue-400">GA4 Data API</span> di Google Cloud Console → buat Service Account</p>
        <p className="mb-1">4. Buat <span className="text-blue-400">app/api/analytics/route.ts</span> → fetch dari <span className="text-green-400">analyticsdata.googleapis.com/v1beta/properties/{"{id}"}/runReport</span></p>
        <p>5. Ganti semua <span className="text-amber-400">dummy data</span> di file ini dengan response API → struktur komponen tidak perlu diubah</p>
      </div> */}
    </div>
  );
}
