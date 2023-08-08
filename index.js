const word = '[a-fA-F\\d:]';

const boundry = options => options && options.includeBoundaries
	? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))`
	: '';

const octet = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)';
const v4 = `${octet}(?:\\.${octet}){3}`;
const v4Private10 = `(10)(?:\\.${octet}){3}`
const v4Private192168 = `(192\\.168)(?:\\.${octet}){2}`
const v4Private172 = `(172\\.)(?:[1-2][6-9]|2\\d|3[0-1])(?:\\.${octet}){2}`
const loopback = '127\\.0\\.0\\.1'

const v6segment = '[a-fA-F\\d]{1,4}';

const v6 = `
(?:
(?:${v6segment}:){7}(?:${v6segment}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6segment}:){6}(?:${v4}|:${v6segment}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6segment}:){5}(?::${v4}|(?::${v6segment}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6segment}:){4}(?:(?::${v6segment}){0,1}:${v4}|(?::${v6segment}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6segment}:){3}(?:(?::${v6segment}){0,2}:${v4}|(?::${v6segment}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6segment}:){2}(?:(?::${v6segment}){0,3}:${v4}|(?::${v6segment}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6segment}:){1}(?:(?::${v6segment}){0,4}:${v4}|(?::${v6segment}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${v6segment}){0,5}:${v4}|(?::${v6segment}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim();

// Pre-compile only the exact regexes because adding a global flag make regexes stateful
const v46Exact = new RegExp(`(?:^${v4}$)|(^${v6}$)`);
const v4exact = new RegExp(`^${v4}$`);
const v4PrivateExact = new RegExp(`(?:^${v4Private10}$)|(^${v4Private192168}$)|(^${v4Private172}$)|(^${loopback}$)`);
const v6exact = new RegExp(`^${v6}$`);

const ipRegex = options => {
	if (options && options.exact) {
		if (options.isPrivate) {
			return v4PrivateExact
		}
		return v46Exact
	} else if (options && options.isPrivate) {
		return new RegExp(`(?:${boundry(options)}${v4Private10}${boundry(options)})|(?:${boundry(options)}${v4Private192168}${boundry(options)})|(?:${boundry(options)}${v4Private172}${boundry(options)})|(?:${boundry(options)}${loopback}${boundry(options)})`, 'g')
	}
	return new RegExp(`(?:${boundry(options)}${v4}${boundry(options)})|(?:${boundry(options)}${v6}${boundry(options)})`, 'g');
}

ipRegex.v4 = options => options && options.exact ? v4exact : new RegExp(`${boundry(options)}${v4}${boundry(options)}`, 'g');
ipRegex.v6 = options => options && options.exact ? v6exact : new RegExp(`${boundry(options)}${v6}${boundry(options)}`, 'g');

export default ipRegex;
