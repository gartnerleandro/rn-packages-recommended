declare module 'react-native-highlighter' {
  import { ReactNode } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  export class Highlight {
    constructor(config: {
      keywords: string[];
      style?: TextStyle;
      onPress?: (keyword: string) => void;
    });
  }

  export interface HighlightedTextProps {
    children: string;
    highlights?: Highlight[];
    caseSensitive?: boolean;
    style?: TextStyle;

    // Hashtags
    hashtags?: boolean;
    hashtagStyle?: TextStyle;
    onHashtagPress?: (hashtag: string) => void;

    // Mentions
    mentions?: boolean;
    mentionStyle?: TextStyle;
    onMentionPress?: (mention: string) => void;

    // Emails
    emails?: boolean;
    emailStyle?: TextStyle;
    onEmailPress?: (email: string) => void;

    // Links
    links?: boolean;
    linkStyle?: TextStyle;
    onLinkPress?: (url: string) => void;
  }

  export default function HighlightedText(props: HighlightedTextProps): ReactNode;
} 