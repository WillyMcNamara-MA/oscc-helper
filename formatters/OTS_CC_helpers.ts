import { OTS_CC_CheckResponse, PassFortError, ExternalResource, Result, PassFortWarning, Decision, ResourceType, DemoResultType } from '../types/OTS_CC_CheckResponse.types.js';
import { InvalidCredentials, InvalidResponse, ProviderConnectionError, ProviderError, UnsupportedDemoResult } from '../types/passfort.app_exception.types.js';

export const build_OTS_CC_CheckResponse = (result: Result, warnings: PassFortWarning[], errors: PassFortError[], external_resources: ExternalResource, provider_data: string): CheckResponse => {
    const response: OTS_CC_CheckResponse = {
        provider_data: provider_data,
        warnings: warnings,
        errors: errors,
        external_resources: [external_resources],
        result: result,
      };

      /*
      without nest class validation, should I throw a specific error
      if the response object is not properly formatted?
      */
    
      return response;
};

export const build_OTS_CC_ExternalResource = (type: ResourceType, url: string, id: string, label: string): ExternalResource => {
    const external_resources: ExternalResource = {
        type: type,
        url: url,
        id: id,
        label: label,
      };
    
      return external_resources;
}

export const build_OTS_CC_Result = (decision: Decision, summary: string): Result => {
    const result: Result = {
        decision: decision,
        summary: summary,
      };
    
      return result;
}

export const run_OTS_CC_DemoCheck = (demoResult: string, url: string, resourceType: ResourceType): CheckResponse => {
    switch (demoResult) {
      case DemoResultType.ANY:
      case DemoResultType.ANY_CHARGE:
      case DemoResultType.EXTERNAL_RESOURCE_EMBED:
      case DemoResultType.EXTERNAL_RESOURCE_LINK:
          /*
          Added this try/catch to replace the plainToClass and validateOrReject functions from nestjs.
          */
          try {
              const responsePlain: CheckResponse = {
                provider_data: 'Demo result. Did not make request to provider.',
                warnings: [],
                errors: [],
                external_resources: [
                  {
                    type: resourceType || ResourceType.LINK,
                    url: url,
                    id: '00000000-0000-0000-0000-000000000000',
                    label: 'Example check',
                  },
                ],
                result: {
                  decision: Decision.PASS,
                  summary: "It's a pass...",
                },
              };
            
              if (demoResult === DemoResultType.EXTERNAL_RESOURCE_LINK) {
                responsePlain.external_resources[0].type = resourceType || ResourceType.LINK;
                responsePlain.external_resources[0].label = resourceType === ResourceType.EMBED ? 'Example embed' : 'Example link';
              }
              return responsePlain;
            } catch (error) {
              throw new InvalidResponse();
            }
  
      case DemoResultType.ERROR_CONNECTION_TO_PROVIDER:
        throw new ProviderConnectionError();
  
      case DemoResultType.ERROR_INVALID_CREDENTIALS:
        throw new InvalidCredentials();
  
      case DemoResultType.ERROR_ANY_PROVIDER_MESSAGE:
        throw new ProviderError(
          'API is not available at this time. Please try again later.',
        );
  
      default:
        throw new UnsupportedDemoResult();
    }
  };