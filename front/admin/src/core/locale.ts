import { $locales, addUniqueKeyError, addUnregisteredKeys } from "../store/locales";

export type Lang = "en" | "ru" | "ht" | "fr" | "es";
export type Languages = { [key in Lang]: Dictionary; };
export type Dictionary = typeof defaultLang;

type DefaultConfig = { defaultValue?: string };
type CustomArgs = { [key: string]: string | number };
export type Template = { key: keyof Dictionary | string; args?: DefaultConfig & CustomArgs };

const defaultLang = {
	"language.ru": "Русский",
	"language.en": "English",
	"language.ht": "Kreyòl",
	"language.fr": "Français",
	"language.es": "Español",
};

const Dict: Languages = {
	en: defaultLang,
	ru: {
		"language.ru": "Русский",
		"language.en": "English",
		"language.ht": "Kreyòl",
		"language.fr": "Français",
		"language.es": "Español",
	},
	ht: {
		"language.ru": "Русский",
		"language.en": "English",
		"language.ht": "Kreyòl",
		"language.fr": "Français",
		"language.es": "Español",
	},
	fr: {
		"language.ru": "Русский",
		"language.en": "English",
		"language.ht": "Kreyòl",
		"language.fr": "Français",
		"language.es": "Español",
	},
	es: {
		"language.ru": "Русский",
		"language.en": "English",
		"language.ht": "Kreyòl",
		"language.fr": "Français",
		"language.es": "Español",
	},
};

export default class Locale {
	static Dict = Dict;

	static Get(key: keyof Dictionary | string, config?: DefaultConfig & CustomArgs): string {
		const { defaultValue, ...params } = config ?? {};
		let result = Dict[$locales.getState().lang]?.[key as keyof Dictionary];
		if (result) {
			for (const [key, value] of Object.entries(params)) {
				result = result.replace(`{{${key}}}`, String(value));
			}
			return result;
		} else {
			if (defaultValue) addUnregisteredKeys({ key, defaultValue } as { key: string; defaultValue: string });
			addUniqueKeyError(key as string);
			return `*${defaultValue || "%Error%"}*`;
		}
	}

	static CreateTemplated(template: Template) {
		return template;
	}
}
