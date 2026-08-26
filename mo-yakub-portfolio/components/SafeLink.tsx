import type { ReactNode } from 'react';
import { isToken } from '@/content/site';

type SafeLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Text shown while `href` is still an unreplaced {{TOKEN}}. */
  placeholder?: string;
  /** Replaces `className` in the placeholder state, when the live styling
      (a filled button, say) would not read correctly as inert text. */
  placeholderClassName?: string;
  /** Opens in a new tab with rel="noreferrer". */
  external?: boolean;
  'aria-label'?: string;
};

/**
 * A link that refuses to ship broken.
 *
 * The three project URLs and every contact detail start life as {{TOKEN}}
 * placeholders. Rather than rendering an anchor pointing at "{{PROJECT_1_URL}}",
 * SafeLink renders inert text until the token is replaced — so the page is
 * presentable at every stage of filling it in.
 */
export default function SafeLink({
  href,
  children,
  className,
  placeholder = 'Link coming soon',
  placeholderClassName,
  external = false,
  ...rest
}: SafeLinkProps) {
  if (isToken(href)) {
    return (
      <span
        className={
          placeholderClassName ??
          `${className ?? ''} cursor-default text-steel decoration-dotted underline-offset-4 [text-decoration-line:underline]`
        }
        aria-disabled="true"
        title={`Replace ${href.trim()} in content/site.ts`}
      >
        {placeholder}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
