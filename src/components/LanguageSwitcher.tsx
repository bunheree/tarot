'use client';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locales, locale: activeLocale } = router;
    const otherLocales = locales?.filter((locale) => locale !== activeLocale) || [];

    const handleLocaleChange = (newLocale: string) => {
        const path = router.asPath;
        router.push(path, path, { locale: newLocale });
    };

    return (
        <div>
            {otherLocales.map((locale) => (
                <button key={locale} onClick={() => handleLocaleChange(locale)}>
                    {locale}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
