'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { authFormSchema, cn } from '@/lib/utils'
import CustomInput from './CustomInput'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user1.actions'
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            dateOfBirth: '',
            ssn: ''
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }
                console.log(userData)
                const newUser = await signUp(userData);
                if (newUser?.error) {
                    setErrorMessage(newUser.error);
                } else if (newUser) {
                    setUser(newUser);
                } else {
                    setErrorMessage('Failed to create account. Please try again.');
                }
            }

            if (type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });

                if (response?.error) {
                    setErrorMessage(response.error);
                } else if (response) {
                    router.push('/');
                } else {
                    setErrorMessage('Invalid email or password. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error submitting auth form:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="auth-form">
            <header className={cn('flex', 'flex-col', 'gap-5', 'md:gap-8')}>
                <Link href="/" className={cn('cursor-pointer', 'flex', 'items-center', 'gap-2')}>
                    <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" />
                    <h1 className={cn('text-26', 'font-ibm-plex-serif', 'font-bold', 'text-black-1')}>Horizon</h1>
                </Link>

                <div className={cn('flex', 'flex-col', 'gap-1', 'md:gap-3')}>
                    <h1 className={cn('text-24', 'lg:text-36', 'font-semibold', 'text-gray-900')}>
                        {user
                            ? 'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                    </h1>
                    <p className={cn('text-16', 'font-normal', 'text-gray-600')}>
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
                </div>
            </header>

            {user ? (
                <div className={cn('flex', 'flex-col', 'gap-4')}>
                    <p className={cn('text-16', 'text-gray-700')}>
                        Account created successfully! Click below to proceed to your dashboard.
                    </p>
                    <PlaidLink user={user} variant="small" />
                    <Button
                        onClick={() => router.push('/')}
                        className={cn('form-btn', 'w-full', 'py-3', 'cursor-pointer')}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {errorMessage && (
                            <div className={cn('p-3', 'text-sm', 'text-red-600', 'bg-red-50', 'border', 'border-red-200', 'rounded-lg')}>
                                {errorMessage}
                            </div>
                        )}

                        {type === 'sign-up' && (
                            <>
                                <div className={cn('flex', 'gap-4')}>
                                    <CustomInput control={form.control} name="firstName" label="First Name" placeholder="Enter your first name" />
                                    <CustomInput control={form.control} name="lastName" label="Last Name" placeholder="Enter your last name" />
                                </div>
                                <CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
                                <CustomInput control={form.control} name="city" label="City" placeholder="Enter your city" />
                                <div className={cn('flex', 'gap-4')}>
                                    <CustomInput control={form.control} name="state" label="State" placeholder="Example: NY" />
                                    <CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101" />
                                </div>
                                <div className={cn('flex', 'gap-4')}>
                                    <CustomInput control={form.control} name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
                                    <CustomInput control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
                                </div>
                            </>
                        )}

                        <CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />
                        <CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

                        <div className={cn('flex', 'flex-col', 'gap-4', 'pt-4')}>
                            <Button type="submit" disabled={isLoading} className={cn('form-btn', 'w-full', 'py-3', 'cursor-pointer')}>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className={cn('animate-spin', 'mr-2')} />
                                        Loading...
                                    </>
                                ) : type === 'sign-in'
                                    ? 'Sign In' : 'Sign Up'
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

            <footer className={cn('flex', 'justify-center', 'gap-1')}>
                <p className={cn('text-14', 'font-normal', 'text-gray-600')}>
                    {type === 'sign-in'
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </p>
                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className={cn('form-link', 'font-semibold')}>
                    {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                </Link>
            </footer>
        </section>
    )
}

export default AuthForm