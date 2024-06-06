export const metadataFactory = (provider_name: string): META_DATA => {
    return {
        protocol_version: 1,
        provider_name: provider_name
      }
}

export type META_DATA = {
    protocol_version: number, 
    provider_name: string
}