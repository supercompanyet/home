import React, { useEffect, useState } from 'react';
import * as C from './styles';
import Image from 'next/image';
import logo from '@images/Logo.svg';
import { Nav } from '@components/Nav';
import { AnimatePresence } from 'framer-motion';
import defaultProfileImage from '@images/default-user-image.svg';
import { MobileMenu } from '@components/MobileMenu';
import { ProfileTab } from '@components/ProfileTab';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

export function Header() {
    const [showProfileTab, setShowProfileTab] = useState(false);
    const { user } = useAuth();

    return (
        <C.Container>
            <div className="logo-nav">
                <Link href="/" passHref>
                    <button className="logo-container">
                        <Image src={logo} alt="logo" layout="fill" />
                    </button>
                </Link>
                <div className="desktop-menu-wrapper"><Nav /></div>

            </div>
            <div className="advertise-user-profile">
                <Link href="/advertise/form" passHref><C.Button>Advertise</C.Button></Link>
                <div className="desktop-menu-wrapper">
                    <C.ProfileTabContainer>
                        <button className="user-image-container" onClick={e => setShowProfileTab(v => !v)}>
                            <Image src={user?.photo_url ?? defaultProfileImage} layout="fill" alt="user profile image" />
                        </button>
                        <AnimatePresence>
                            {
                                showProfileTab && (
                                    <ProfileTab
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{
                                            default: { duration: .2 },
                                        }} />
                                )
                            }
                        </AnimatePresence>

                    </C.ProfileTabContainer>
                </div>
                <div className="mobile-menu-wrapper">
                    <MobileMenu />
                </div>

            </div>
        </C.Container>
    )
}
