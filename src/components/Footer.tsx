import Link from 'next/link';
import { IconType } from 'react-icons';
import { MaxWidthWrapper } from '../utils/MaxWidthWrapper';

export const Footer = () => {
	return (
		<footer className='relative overflow-hidden py-12'>
			<MaxWidthWrapper className='relative z-20 grid grid-cols-12 gap-x-8 gap-y-6'>
				<LogoColumn />
				<GenericColumn
					title='Quick Links'
					links={[
						{
							title: 'Try it',
							href: '/'
						},
						{
							title: 'How it works',
							href: '/#how'
						},
						{
							title: 'Benefits',
							href: '/#benefits'
						},
						{
							title: 'Testimonials',
							href: '/#testimonials'
						},
						{
							title: 'FAQ',
							href: '/#faq'
						}
					]}
				/>
				<GenericColumn
					title='Legal'
					links={[
						{
							title: 'Terms & Conditions',
							href: '/#'
						},
						{
							title: 'Privacy Policy',
							href: '/#'
						}
					]}
				/>

				{/* <GenericColumn
          title="Socials"
          links={[
            {
              title: "Twitter",
              href: "/#",
              Icon: SiX,
            },
            {
              title: "Instagram",
              href: "/#",
              Icon: SiInstagram,
            },
            {
              title: "Youtube",
              href: "/#",
              Icon: SiYoutube,
            },
          ]}
        /> */}
			</MaxWidthWrapper>
		</footer>
	);
};

const LogoColumn = () => {
	return (
		<div className='col-span-6 md:col-span-4'>
			<div className='flex items-center gap-2'>
				<img src='logo2.svg' alt='' height={50} width={50} />
				<p className='text-2xl font-bold text-white'>Codeban</p>
			</div>
			<span className='mt-3 inline-block text-xs text-zinc-400'>© Codeban - All rights reserved.</span>
		</div>
	);
};

const GenericColumn = ({ title, links }: { title: string; links: { title: string; href: string; Icon?: IconType }[] }) => {
	return (
		<div className='col-span-6 space-y-2 text-sm md:col-span-2'>
			<span className='block text-zinc-50'>{title}</span>
			{links.map((l) => (
				<Link key={l.title} href={l.href} className='flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-zinc-200 hover:underline'>
					{l.Icon && <l.Icon />}
					{l.title}
				</Link>
			))}
		</div>
	);
};
