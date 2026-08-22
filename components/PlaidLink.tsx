import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button';
import { cn } from "../lib/utils";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user1.actions';
import { useRouter } from 'next/navigation';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState('');

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
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
                    disabled={!ready}
                    className={cn('plaidlink-ghost', 'cursor-pointer')}
                >
                    Connect Bank
                </Button>
            ) : (
                <Button
                    onClick={() => open()}
                    disabled={!ready}
                    className={cn('plaidlink-default', 'cursor-pointer')}
                >
                    Connect Bank
                </Button>
            )}
        </>
    );
};

export default PlaidLink;