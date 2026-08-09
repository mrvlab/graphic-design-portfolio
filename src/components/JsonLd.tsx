import React from 'react';

type JsonLdProps = {
  data: Record<string, unknown>;
};

const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
