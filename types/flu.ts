import { LucideIcon } from "lucide-react";

export interface FluData {
    Year: number;
    Week: number;
    From: string;
    To: string;
    ILI_GOPC: number;
    ILI_PMP: number;
    H1: number;
    H3: number;
    B: number;
    AandB: number;
    H1_proportion: number;
    H3_proportion: number;
    B_proportion: number;
    AandB_proportion: number;
    ILI_School: number;
    ILI_NonSchool: number;
    Adm_0_5: number;
    Adm_6_11: number;
    Adm_12_17: number;
    Adm_18_49: number;
    Adm_50_64: number;
    Adm_65_higher: number;
    Adm_All: number;
    ILI_AED: number;
    Fever_CCCKG: number;
    Fever_RCHE: number;
    ILI_CMP: number;
    SevereCase_0_17: number;
    SevereCase_18_49: number;
    SevereCase_50_64: number;
    SevereCase_65_higher: number;
  }
  
  export interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string | number;
    subValue: string;
    color: string;
  }
  
  export interface RiskLevel {
    level: string;
    color: string;
  }