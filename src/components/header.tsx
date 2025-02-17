import { ProfileDropdown } from './profile-dropdown'
import { Search } from './search'
import { ThemeSwitch } from './theme-switch'

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 flex'>
          <a className='mr-6 flex items-center space-x-2' href='/'>
            <span className='font-bold'>Truchas Admin</span>
          </a>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <Search />
          </div>
          <nav className='flex items-center space-x-2'>
            <ThemeSwitch />
            <ProfileDropdown hidden={true} />
          </nav>
        </div>
      </div>
    </header>
  )
}
