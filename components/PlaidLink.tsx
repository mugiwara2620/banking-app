'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { cn } from "../lib/utils";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user1.actions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('');

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string | null) => {
        if (!public_token) return;

        await exchangePublicToken({
            publicToken: public_token,
            user
        });
        router.push('/');
    }, [user, router]);

    useEffect(() => {
        const getLinkToken = async () => {
            if (!user) return;
            const data = await createLinkToken(user);
            if (data?.linkToken) {
                setToken(data.linkToken);
            }
        };
        getLinkToken();
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ? (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className={cn('plaidlink-primary', 'cursor-pointer')}
                >
                    Connect Bank
                </Button>
            ) : variant === "ghost" ? (
                <Button
                    onClick={() => open()}
                    variant="ghost"
                    disabled={!ready}
                    className={cn('plaidlink-ghost', 'cursor-pointer')}
                >
                    <Image
                        src="/icons/connect-bank.svg"
                        alt="connect bank"
                        width={24}
                        height={24}
                    />
                    <p className={cn('hidden', 'text-[16px]', 'font-semibold', 'text-black-2', 'xl:block')}>Connect Bank</p>
                </Button>
            ) : (
                <Button
                    onClick={() => open()}
                    variant="ghost"
                    disabled={!ready}
                    className={cn('plaidlink-default', 'cursor-pointer')}
                >
                    <Image
                        src="/icons/plus.svg"
                        width={20}
                        height={20}
                        alt="plus"
                    />
                    <h2 className={cn('text-14', 'font-semibold', 'text-gray-600')}>Add Bank</h2>
                </Button>
            )}
        </>
    );
};

export default PlaidLink;
