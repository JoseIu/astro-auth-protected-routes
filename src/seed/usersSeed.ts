import { faker } from "@faker-js/faker";
import prisma from "../db/index";
interface UsersSeed {
	name: string;
	email: string;
	nickName: string;
	gender: string;
	is_active: boolean;
}

const generateUsersSeed = (): UsersSeed[] => {
	const usersSeed: UsersSeed[] = [];

	for (let index = 0; index < 20; index++) {
		const user: UsersSeed = {
			name: faker.person.firstName(),
			email: faker.internet.email(),

			nickName: faker.person.middleName(),
			gender: faker.person.gender(),
			is_active: faker.datatype.boolean(),
		};
		usersSeed.push(user);
	}
	return usersSeed;
};
const main = async () => {
	await prisma.user.deleteMany();

	await prisma.user.createMany({
		data: generateUsersSeed(),
	});

	console.log("SEED USERS EJECUTADO CORRECTAMENTE!! 🚀🚀🚀🚀🚀");
};

(() => {
	if (process.env.NODE_ENV === "production") return;
	main();
})();
