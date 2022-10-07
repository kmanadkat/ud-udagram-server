export const config = {
	dev: {
		username: process.env.POSTGRES_DEV_USERNAME,
		password: process.env.POSTGRES_DEV_PASSWORD,
		database: process.env.POSTGRES_DEV_DATABASE,
		host: process.env.POSTGRES_DEV_HOST,
		dialect: 'postgres',
		aws_region: process.env.AWS_DEV_REGION,
		aws_profile: process.env.AWS_DEV_PROFILE,
		aws_media_bucket: process.env.AWS_DEV_S3_BUCKET,
	},
	jwt: {
		secret: ' ',
	},
	prod: {
		username: '',
		password: '',
		database: 'udagram_prod',
		host: '',
		dialect: 'postgres',
	},
}
