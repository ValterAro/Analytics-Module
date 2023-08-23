export const configurationData = {
  recipe: 'default.v1',
  language: 'et',
  pipeline: [
    {
      name: 'WhitespaceTokenizer',
      enabled: false,
    },
    {
      name: 'RegexFeaturizer',
      enabled: true,
    },
    {
      name: 'LexicalSyntacticFeaturizer',
      enabled: true,
    },
    {
      name: 'CountVectorsFeaturizer',
      enabled: true,
    },
    {
      name: 'CountVectorsFeaturizer',
      enabled: true,
      analyzer: 'char_wb',
      min_ngram: 1,
      max_ngram: 4,
    },
    {
      name: 'DIETClassifier',
      enabled: false,
      entity_recognition: false,
      epochs: 20,
      random_seed: 50,
    },
    {
      name: 'RegexEntityExtractor',
      enabled: false,
      case_sensitive: true,
      use_regexes: true,
    },
    {
      name: 'FallbackClassifier',
      enabled: true,
      threshold: 0.8,
    },
  ],
  policies: [
    {
      id: 1,
      name: 'MemorizationPolicy',
      enabled: false,
      priority: 3,
    },
    {
      id: 2,
      name: 'TEDPolicy',
      enabled: true,
      priority: 1,
      max_history: 5,
      epochs: 1000,
    },
    {
      id: 3,
      name: 'RulePolicy',
      enabled: true,
      enable_fallback_prediction: false,
      priority: 6,
      core_fallback_threshold: 0.6,
    },
  ],
};
