"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const locales = [
        { code: 'en', label: 'EN' },
        { code: 'ru', label: 'RU' },
        { code: 'id', label: 'ID' },
        { code: 'ja', label: 'JA' },
    ];

    const switchLocale = (newLocale: string) => {
        // next-intl expects the pathname in the first argument
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <div className="relative z-50 ml-4 mr-2 md:mr-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-xs text-white uppercase font-mono tracking-widest hover:text-cyan-400 transition-colors"
            >
                {locales.find(l => l.code === locale)?.label || 'EN'}
                <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 bg-[#03070C]/90 backdrop-blur-md border border-white/10 rounded-md py-2 min-w-[80px] flex flex-col items-center">
                    {locales.map(l => (
                        <button
                            key={l.code}
                            onClick={() => switchLocale(l.code)}
                            className={`text-xs w-full py-2 tracking-widest hover:bg-white/5 transition-colors ${locale === l.code ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
