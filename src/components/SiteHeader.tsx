/** Components */
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Navbar,
  Text
} from '@nextui-org/react';
import Link from 'next/link';

/** Icons */
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/solid';

/** Hooks */
import { useCart } from '@/modules/AppContext';

export default function SiteHeader() {
  const cart = useCart();

  return (
    <Navbar variant="floating" isBordered>
      <Navbar.Brand>
        <Link href="/">
          <Text weight="bold">Shopping</Text>
        </Link>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link>
          <Badge color="primary" content={cart.length} variant="flat">
            <Button as={Link} href="/cart" auto css={{ padding: '$4' }} light>
              <ShoppingCartIcon width={24} />
            </Button>
          </Badge>
        </Navbar.Link>
        <Navbar.Item>
          <Dropdown>
            <Dropdown.Trigger>
              <Avatar squared icon={<UserIcon width={24} />} />
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Item key="Profile">Profile</Dropdown.Item>
              <Dropdown.Item key="Orders">Orders</Dropdown.Item>
              <Dropdown.Section>
                <Dropdown.Item key="Settings">Settings</Dropdown.Item>
                <Dropdown.Item key="Logout" color="error">
                  Logout
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
