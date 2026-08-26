import SafeLink from '@/components/SafeLink';
import { WhatsAppIcon } from '@/components/icons';
import { whatsappHref } from '@/content/site';

/**
 * A clinic owner reading this on a phone should never have to scroll to send a
 * message. Opaque, one action, hairline top border — no floating pill.
 */
export default function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-surface pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="px-4 py-3">
        <SafeLink
          href={whatsappHref()}
          external
          placeholder="Add your WhatsApp number"
          className="flex h-12 w-full items-center justify-center gap-3 bg-surgical text-sm font-medium text-surface"
          placeholderClassName="flex h-12 w-full items-center justify-center gap-3 border border-hairline text-sm text-steel"
          aria-label="Message me on WhatsApp"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Message me on WhatsApp
        </SafeLink>
      </div>
    </div>
  );
}
