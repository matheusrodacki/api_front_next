'use client';

import AddressDetailsStep from '@/components/SignupComponents/AddressDetailsStep';
import ClientDetailsStep from '@/components/SignupComponents/ClientDetailsStep';
import UserDetailsStep from '@/components/SignupComponents/UserDetailsStep';
import Image from 'next/image';
import { useState } from 'react';

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clientType: 'individual',
    individualData: {
      full_name: '',
      social_security_number: '',
      date_of_birth: '',
    },
    companyData: {
      company_name: '',
      tax_id_number: '',
      contact_person: '',
    },
    addressData: {
      street: '',
      number: '',
      additionalInfo: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      address_type: 'comercial',
    },
  });

  // Mensagens de erro e sucesso
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Funções para avançar e voltar etapas
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Função para atualizar os dados do formulário
  const updateFormData = (newData: any) => {
    setFormData({
      ...formData,
      ...newData,
    });
  };

  // Função de submissão final do formulário
  const handleSubmit = async () => {
    // Lógica de submissão
    const requestData = {
      client_type: formData.clientType,
      individual:
        formData.clientType === 'individual'
          ? formData.individualData
          : undefined,
      company:
        formData.clientType === 'company' ? formData.companyData : undefined,
      address: formData.addressData,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage('Cadastro realizado com sucesso!');
        // Redirecionar ou outras ações
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Ocorreu um erro ao conectar com o servidor.');
    }
  };

  const detailsSvg = (
    <svg
      className='size-6 sm:size-5'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2'
      />
    </svg>
  );

  const addressSvg = (
    <svg
      className='size-6 sm:size-5'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );

  const credentialsSvg = (
    <svg
      className='size-6 sm:size-5'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
      />
    </svg>
  );

  // Componentes da barra de progresso
  const steps = [
    { id: 1, name: 'Credenciais', svg: credentialsSvg },
    { id: 2, name: 'Informações', svg: detailsSvg },
    { id: 3, name: 'Endereço', svg: addressSvg },
  ];

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        {/* Seção da imagem ou cabeçalho */}
        <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
          <Image
            alt=''
            src='https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            width={870}
            height={580}
            className='absolute inset-0 h-full w-full object-cover opacity-80'
          />

          <div className='hidden lg:relative lg:block lg:p-12'>
            <a className='block text-white' href='#'>
              <span className='sr-only'>Home</span>
              <svg
                className='h-8 sm:h-10'
                viewBox='0 0 28 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z'
                  fill='currentColor'
                />
              </svg>
            </a>

            <h2 className='mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl'>
              Welcome to Squid 🦑
            </h2>

            <p className='mt-4 leading-relaxed text-white/90'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
          <div className='max-w-xl lg:max-w-3xl'>
            {/* Cabeçalho do formulário */}
            <h1 className='text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white'>
              Crie sua conta
            </h1>

            {/* Barra de progresso */}
            <div className='mt-4'>
              <h2 className='sr-only'>Steps</h2>
              <div className='after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200'>
                <ol className='grid grid-cols-3 text-sm font-medium text-gray-500'>
                  {steps.map((step, index) => (
                    <li
                      key={step.id}
                      className={`relative flex justify-${
                        index === 0
                          ? 'start'
                          : index === steps.length - 1
                          ? 'end'
                          : 'center'
                      } ${
                        currentStep === step.id
                          ? 'text-blue-600'
                          : currentStep > step.id
                          ? 'text-green-600'
                          : 'text-gray-500'
                      }`}>
                      {step.svg}
                      <span className='hidden sm:block'>{step.name}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Mensagens de erro ou sucesso */}
            {errorMessage && (
              <div
                role='alert'
                className='mt-4 rounded border-s-4 border-red-500 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900'>
                <strong className='block font-medium text-red-800 dark:text-red-100'>
                  Algo deu errado
                </strong>
                <p className='mt-2 text-sm text-red-700 dark:text-red-200'>
                  {errorMessage}
                </p>
              </div>
            )}

            {successMessage && (
              <div
                role='alert'
                className='mt-4 rounded border-s-4 border-green-500 bg-green-50 p-4 dark:border-green-600 dark:bg-green-900'>
                <strong className='block font-medium text-green-800 dark:text-green-100'>
                  Sucesso!
                </strong>
                <p className='mt-2 text-sm text-green-700 dark:text-green-200'>
                  {successMessage}
                </p>
              </div>
            )}

            {/* Renderização das etapas */}
            {currentStep === 1 && (
              <UserDetailsStep
                data={{ email: formData.email, password: formData.password }}
                updateData={(data) => updateFormData(data)}
                nextStep={handleNextStep}
                setErrorMessage={setErrorMessage}
              />
            )}
            {currentStep === 2 && (
              <ClientDetailsStep
                clientType={formData.clientType}
                individualData={formData.individualData}
                companyData={formData.companyData}
                updateData={(data) => updateFormData(data)}
                nextStep={handleNextStep}
                prevStep={handlePrevStep}
                setErrorMessage={setErrorMessage}
              />
            )}
            {currentStep === 3 && (
              <AddressDetailsStep
                data={formData.addressData}
                updateData={(data) => updateFormData({ addressData: data })}
                submitForm={handleSubmit}
                prevStep={handlePrevStep}
                setErrorMessage={setErrorMessage}
              />
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
