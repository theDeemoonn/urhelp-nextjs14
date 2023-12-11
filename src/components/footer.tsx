import Link from "next/link"

function FooterComponent  ()  {
	const date = new Date().getFullYear()

	return (
		<footer className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-background w-full sticky top-0 z-50  border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
		
				
				<div className='flex flex-wrap items-center md:justify-between justify-center'>
					<div className='w-full md:w-4/12 px-4 mx-auto text-center'>
						<div className='text-sm font-semibold py-1 className="block  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400  dark:hover:bg-gray-700  lg:dark:hover:bg-transparent dark:border-gray-700"'>
							Copyright © <span id='get-current-year'>2022-{date}</span>
							<Link href='https://pravodoc.ru' className=" py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" target='_blank'>
								{' '}
								Pravodoc.ru
							</Link>
						</div>
					</div>
				</div>
			
		</footer>
	)
}

export default FooterComponent
