

import Link from 'next/link';
import FormAction from './FormAction';

export default function SignUp() {
    return (
        <div className="contain py-16">
            <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <h2 className="text-2xl uppercase font-medium mb-1">Create an account</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    Register for new customer
                </p>
              <FormAction/>

                {/* login with */}
                <div className="mt-6 flex justify-center relative">
                    <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                    <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
                </div>
                <div className="mt-4 flex gap-4">
                    <Link href="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</Link>
                    <Link href="#" className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</Link>
                </div>
                {/* ./login with */}

                <p className="mt-4 text-center text-gray-600">Already have an account? <Link href="/en/login" className="text-primary">Login now</Link></p>
            </div>
        </div>
    );
}
