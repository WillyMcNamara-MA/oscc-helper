import { SupportedCountries } from "./OTS_CC_config.types";

type UUID = string;
type EntityType = "COMPANY";
type CommercialRelationship = "DIRECT";
type DemoResult = "ANY";
type TaxIdType = "EUROVAT" | "VAT" | "EIN" | "OTHER";
type AddressType = "registered_address"
| "branch_address"
| "head_office_address"
| "contact_address"
| "trading_address";
type Country = SupportedCountries; 
type CountryOfIncorporation = Country; 
type AddressForm = "FREEFORM";
type ClassificationType = "SIC"
| "NACE"
| "NAICS"
| "NAF"
| "OTHER";
type OwnershipType = "PARTNERSHIP"
| "COMPANY"
| "SOLE_PROPRIETORSHIP"
| "ASSOCIATION"
| "TRUST"
| "OTHER"
| "BRANCH";

export interface OTS_CC_CheckRequestType {
  id: UUID;
  demo_result: DemoResult | null;
  commercial_relationship: CommercialRelationship;
  check_input: CheckInput;
  provider_config: RequestProviderConfig;
  provider_credentials: RequestProviderCredentials | null;
}

interface CheckInput {
  entity_type: EntityType;
  metadata: RequestMetadata;
}

export interface RequestMetadata {
  number: string;
  bvd_id: string;
  bvd9: string;
  creditsafe_id: string;
  isin: string;
  lei: string;
  uk_charity_commission_number: string;

  tax_ids: TaxId[];
  name: string;
  previous_names: PreviousName[];
  addresses: Address[];
  country_of_incorporation: CountryOfIncorporation;
  state_of_incorporation: string;
  jurisdiction: string;
  areas_of_activity: AreaOfActivity[];
  description: string;
  number_of_employees: number;
  registry: string;
  industry_classifications: IndustryClassification[];
  is_active: boolean;
  is_active_details: string;
  trade_description: string;
  contact_details: ContactDetails;
  incorporation_date: string;
  company_type: string;
  structured_company_type: StructuredCompanyType;
  company_type_description: string;
}

interface TaxId {
  tax_id_type: TaxIdType;
  tax_id_name: string;
  value: string;
}

interface PreviousName {
  start: string;
  end: string;
  name: string;
}

interface Address {
  type: AddressType;
  address: {
    type: AddressForm;
    country: Country;
    text: string;
  };
}

interface AreaOfActivity {
  location: string;
}

interface IndustryClassification {
  classification_type: ClassificationType;
  classification_version: string;
  code
: string;
  description: string;
}

interface ContactDetails {
  phone_number: string;
  url: string;
  email: string;
}

interface StructuredCompanyType {
  is_public: boolean;
  is_limited: boolean;
  ownership_type: OwnershipType;
}

export interface RequestProviderConfig {
  [key: string]: string | boolean | number;
}

export interface RequestProviderCredentials {
  [key: string]: string | boolean | number;
}