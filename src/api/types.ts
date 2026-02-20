export interface AnalyticsSummaryResponse {
  payments: AnalyticsPaymentsSummary;
  conversion: AnalyticsConversionSummary;
  repeatPurchases: AnalyticsRepeatPurchasesSummary;
  returns: AnalyticsReturnsSummary;
  trafficSources: AnalyticsTrafficSourceSummary[];
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
