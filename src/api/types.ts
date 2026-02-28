export interface AnalyticsSummaryResponse {
  payments: AnalyticsPaymentsSummary;
  conversion: AnalyticsConversionSummary;
  repeatPurchases: AnalyticsRepeatPurchasesSummary;
  returns: AnalyticsReturnsSummary;
  trafficSources: AnalyticsTrafficSourceSummary[];
  usageEvents?: AnalyticsUsageEventsSummary | null;
}

export interface AnalyticsUsageEventsSummary {
  eventTypes: AnalyticsEventTypeCount[];
  dailyLast30Days: AnalyticsDailyCount[];
  dailyByTypeLast14Days: AnalyticsDailyEventTypeCount[];
  hourlyLast7DaysUtc: AnalyticsHourlyCount[];
  trafficSources: AnalyticsUsageTrafficSourceCount[];
  funnel: AnalyticsEventFunnelSummary;
}

export interface AnalyticsEventTypeCount {
  eventType: string;
  count: number;
}

export interface AnalyticsDailyCount {
  dayUtc: string;
  count: number;
}

export interface AnalyticsDailyEventTypeCount {
  dayUtc: string;
  eventType: string;
  count: number;
}

export interface AnalyticsHourlyCount {
  hourUtc: number;
  count: number;
}

export interface AnalyticsUsageTrafficSourceCount {
  source: string;
  count: number;
}

export interface AnalyticsEventFunnelSummary {
  journeys: AnalyticsJourneyFunnelSummary;
  raw: AnalyticsRawEventFunnelSummary;
}

export interface AnalyticsJourneyFunnelSummary {
  startedJourneys: number;
  answeredJourneys: number;
  paidJourneys: number;
  answeredFromStartedRate: number;
  paidFromStartedRate: number;
  paidFromAnsweredRate: number;
}

export interface AnalyticsRawEventFunnelSummary {
  sessionStartedEvents: number;
  answerSubmittedEvents: number;
  paymentSucceededEvents: number;
}

export interface AnalyticsPaymentsSummary {
  grossSucceededCount: number;
  netSucceededMinusRefundedCount: number;
}

export interface AnalyticsConversionSummary {
  operational: AnalyticsOperationalConversionSummary;
  cohort: AnalyticsCohortConversionSummary;
}

export interface AnalyticsOperationalConversionSummary {
  attempts: AnalyticsOperationalAttemptConversionSummary;
  users: AnalyticsOperationalUserConversionSummary;
}

export interface AnalyticsOperationalAttemptConversionSummary {
  completed: number;
  paidSameWindow: number;
  rate: number;
}

export interface AnalyticsOperationalUserConversionSummary {
  completedUsers: number;
  paidUsersSameWindow: number;
  rate: number;
}

export interface AnalyticsCohortConversionSummary {
  attempts: AnalyticsCohortAttemptConversionSummary;
  users: AnalyticsCohortUserConversionSummary;
}

export interface AnalyticsCohortAttemptConversionSummary {
  completed: number;
  paidByCutoff: number;
  rate: number;
}

export interface AnalyticsCohortUserConversionSummary {
  completedUsers: number;
  paidUsersByCutoff: number;
  rate: number;
}

export interface AnalyticsRepeatPurchasesSummary {
  repeatPurchasersLifetimeToUtc: number;
}

export interface AnalyticsReturnsSummary {
  chatReturnUsers: number;
  questionnaireReturnUsers: number;
}

export interface AnalyticsTrafficSourceSummary {
  source: string;
  completed: number;
  paid: number;
  cohortRate: number;
}
