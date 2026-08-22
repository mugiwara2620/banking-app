import AuthForm from '@/components/AuthForm'
import { cn } from "../../../lib/utils";

const SignUp = async () => {

  return (
    <section className={cn('flex-center', 'size-full', 'max-sm:px-6')}>
      <AuthForm type='sign-up' />
    </section>
  )
}

export default SignUp
