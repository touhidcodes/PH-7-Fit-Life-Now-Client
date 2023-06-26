import React from 'react';

const Footer = () => {
	return (
		<footer className=' bg-blue-950 '>
			<div className='mx-auto max-w-screen-xl text-white p-10'>
				<div className='footer'>
					<div>
						{/* Image */}
						<p>
							ACME Industries Ltd.
							<br />
							Providing reliable tech since 1992
						</p>
					</div>
					<div>
						<span className='footer-title text-xl'>Services</span>
						<a className='link link-hover'>Branding</a>
						<a className='link link-hover'>Design</a>
						<a className='link link-hover'>Marketing</a>
						<a className='link link-hover'>Advertisement</a>
					</div>
					<div>
						<span className='footer-title text-xl'>Company</span>
						<a className='link link-hover'>About us</a>
						<a className='link link-hover'>Contact</a>
						<a className='link link-hover'>Jobs</a>
						<a className='link link-hover'>Press kit</a>
					</div>
					<div>
						<span className='footer-title text-xl'>Legal</span>
						<a className='link link-hover'>Terms of use</a>
						<a className='link link-hover'>Privacy policy</a>
						<a className='link link-hover'>Cookie policy</a>
					</div>
				</div>
				<hr />
			</div>
		</footer>
	);
};

export default Footer;
