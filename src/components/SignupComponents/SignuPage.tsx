import { useState } from 'react';

export default function SignupPage() {
  // Estados das etapas
  const [currentStep, setCurrentStep] = useState(1);

  // Etapa 1: Dados do usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Etapa 2: Dados do cliente
  const [clientType, setClientType] = useState('individual'); // 'individual' ou 'company'

  // Dados pessoa física
  const [individualData, setIndividualData] = useState({
    full_name: '',
    social_security_number: '',
    date_of_birth: '',
  });

  // Dados pessoa jurídica
  const [companyData, setCompanyData] = useState({
    company_name: '',
    tax_id_number: '',
    contact_person: '',
  });

  // Erros etapa 2
  const [individualError, setIndividualError] = useState({});
  const [companyError, setCompanyError] = useState({});

  // Etapa 3: Dados de endereço
  const [addressData, setAddressData] = useState({
    street: '',
    number: '',
    additionalInfo: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    address_type: 'comercial',
  });

  // Erros etapa 3
  const [addressError, setAddressError] = useState({});

  // Mensagens gerais
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Regex para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Funções para avançar e voltar etapas
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Função de validação da etapa atual
  const validateCurrentStep = () => {
    let valid = true;

    if (currentStep === 1) {
      // Validação dos dados do usuário
      if (!email) {
        setEmailError('O email é obrigatório.');
        valid = false;
      } else if (!emailRegex.test(email)) {
        setEmailError('Insira um email válido.');
        valid = false;
      } else {
        setEmailError('');
      }

      if (!password) {
        setPasswordError('A senha é obrigatória.');
        valid = false;
      } else if (password.length < 6) {
        setPasswordError('A senha deve ter pelo menos 6 caracteres.');
        valid = false;
      } else {
        setPasswordError('');
      }
    } else if (currentStep === 2) {
      // Validação dos dados do cliente
      if (clientType === 'individual') {
        const errors = {};
        if (!individualData.full_name) {
          errors.full_name = 'O nome completo é obrigatório.';
          valid = false;
        }
        if (!individualData.social_security_number) {
          errors.social_security_number = 'O CPF é obrigatório.';
          valid = false;
        }
        if (!individualData.date_of_birth) {
          errors.date_of_birth = 'A data de nascimento é obrigatória.';
          valid = false;
        }
        setIndividualError(errors);
      } else if (clientType === 'company') {
        const errors = {};
        if (!companyData.company_name) {
          errors.company_name = 'O nome da empresa é obrigatório.';
          valid = false;
        }
        if (!companyData.tax_id_number) {
          errors.tax_id_number = 'O CNPJ é obrigatório.';
          valid = false;
        }
        if (!companyData.contact_person) {
          errors.contact_person = 'O nome do contato é obrigatório.';
          valid = false;
        }
        setCompanyError(errors);
      }
    } else if (currentStep === 3) {
      // Validação dos dados de endereço
      const errors = {};
      if (!addressData.street) {
        errors.street = 'A rua é obrigatória.';
        valid = false;
      }
      if (!addressData.number) {
        errors.number = 'O número é obrigatório.';
        valid = false;
      }
      if (!addressData.city) {
        errors.city = 'A cidade é obrigatória.';
        valid = false;
      }
      if (!addressData.state) {
        errors.state = 'O estado é obrigatório.';
        valid = false;
      }
      if (!addressData.country) {
        errors.country = 'O país é obrigatório.';
        valid = false;
      }
      if (!addressData.postalCode) {
        errors.postalCode = 'O CEP é obrigatório.';
        valid = false;
      }
      setAddressError(errors);
    }

    return valid;
  };

  // Função de submissão final do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCurrentStep()) {
      return;
    }

    const requestData = {
      client_type: clientType,
      individual: clientType === 'individual' ? individualData : undefined,
      company: clientType === 'company' ? companyData : undefined,
      address: addressData,
      email: email,
      password: password,
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
        const data = await response.json();
        setSuccessMessage('Cadastro realizado com sucesso!');
        // Redirecione o usuário ou realize outras ações aqui
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErrorMessage('Ocorreu um erro ao conectar com o servidor.');
    }
  };

  // Componentes de renderização das etapas
  const renderUserDetails = () => {
    return (
      <form onSubmit={handleNextStep} className='mt-8 grid grid-cols-6 gap-6'>
        {/* Email */}
        <div className='col-span-6'>
          <label
            htmlFor='Email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Email
          </label>
          <input
            type='email'
            id='Email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
              if (errorMessage) setErrorMessage('');
            }}
            className={`mt-1 w-full rounded-md border ${
              emailError ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {emailError && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {emailError}
            </p>
          )}
        </div>

        {/* Senha */}
        <div className='col-span-6'>
          <label
            htmlFor='Password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Senha
          </label>
          <input
            type='password'
            id='Password'
            name='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError('');
              if (errorMessage) setErrorMessage('');
            }}
            className={`mt-1 w-full rounded-md border ${
              passwordError ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {passwordError && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {passwordError}
            </p>
          )}
        </div>

        {/* Botão para próximo passo */}
        <div className='col-span-6 flex justify-end'>
          <button
            type='submit'
            className='inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring dark:hover:bg-blue-700 dark:hover:text-white'>
            Próximo
          </button>
        </div>
      </form>
    );
  };

  const renderClientDetails = () => {
    return (
      <form onSubmit={handleNextStep} className='mt-8 grid grid-cols-6 gap-6'>
        {/* Tipo de Cliente */}
        <div className='col-span-6'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Tipo de Cliente
          </label>
          <div className='mt-2 flex items-center space-x-4'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='clientType'
                value='individual'
                checked={clientType === 'individual'}
                onChange={(e) => setClientType(e.target.value)}
                className='form-radio text-blue-600'
              />
              <span className='ml-2 text-gray-700 dark:text-gray-200'>
                Pessoa Física
              </span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='clientType'
                value='company'
                checked={clientType === 'company'}
                onChange={(e) => setClientType(e.target.value)}
                className='form-radio text-blue-600'
              />
              <span className='ml-2 text-gray-700 dark:text-gray-200'>
                Pessoa Jurídica
              </span>
            </label>
          </div>
        </div>

        {/* Dados Pessoa Física */}
        {clientType === 'individual' && (
          <>
            <div className='col-span-6'>
              <label
                htmlFor='FullName'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                Nome Completo
              </label>
              <input
                type='text'
                id='FullName'
                name='full_name'
                value={individualData.full_name}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    full_name: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  individualError.full_name
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {individualError.full_name && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {individualError.full_name}
                </p>
              )}
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='SSN'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                CPF
              </label>
              <input
                type='text'
                id='SSN'
                name='social_security_number'
                value={individualData.social_security_number}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    social_security_number: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  individualError.social_security_number
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {individualError.social_security_number && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {individualError.social_security_number}
                </p>
              )}
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='DOB'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                Data de Nascimento
              </label>
              <input
                type='date'
                id='DOB'
                name='date_of_birth'
                value={individualData.date_of_birth}
                onChange={(e) =>
                  setIndividualData({
                    ...individualData,
                    date_of_birth: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  individualError.date_of_birth
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {individualError.date_of_birth && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {individualError.date_of_birth}
                </p>
              )}
            </div>
          </>
        )}

        {/* Dados Pessoa Jurídica */}
        {clientType === 'company' && (
          <>
            <div className='col-span-6'>
              <label
                htmlFor='CompanyName'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                Nome da Empresa
              </label>
              <input
                type='text'
                id='CompanyName'
                name='company_name'
                value={companyData.company_name}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    company_name: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  companyError.company_name
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {companyError.company_name && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {companyError.company_name}
                </p>
              )}
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='TaxID'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                CNPJ
              </label>
              <input
                type='text'
                id='TaxID'
                name='tax_id_number'
                value={companyData.tax_id_number}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    tax_id_number: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  companyError.tax_id_number
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {companyError.tax_id_number && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {companyError.tax_id_number}
                </p>
              )}
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor='ContactPerson'
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                Nome do Contato
              </label>
              <input
                type='text'
                id='ContactPerson'
                name='contact_person'
                value={companyData.contact_person}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    contact_person: e.target.value,
                  })
                }
                className={`mt-1 w-full rounded-md border ${
                  companyError.contact_person
                    ? 'border-red-500'
                    : 'border-gray-200'
                } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
              />
              {companyError.contact_person && (
                <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                  {companyError.contact_person}
                </p>
              )}
            </div>
          </>
        )}

        {/* Botões para voltar e avançar */}
        <div className='col-span-6 flex justify-between'>
          <button
            type='button'
            onClick={handlePrevStep}
            className='inline-block rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring dark:hover:bg-gray-700 dark:hover:text-white'>
            Voltar
          </button>
          <button
            type='submit'
            className='inline-block rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring dark:hover:bg-blue-700 dark:hover:text-white'>
            Próximo
          </button>
        </div>
      </form>
    );
  };

  const renderAddressDetails = () => {
    return (
      <form onSubmit={handleSubmit} className='mt-8 grid grid-cols-6 gap-6'>
        {/* Rua */}
        <div className='col-span-6'>
          <label
            htmlFor='Street'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Rua
          </label>
          <input
            type='text'
            id='Street'
            name='street'
            value={addressData.street}
            onChange={(e) =>
              setAddressData({ ...addressData, street: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.street ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.street && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.street}
            </p>
          )}
        </div>

        {/* Número */}
        <div className='col-span-6 sm:col-span-2'>
          <label
            htmlFor='Number'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Número
          </label>
          <input
            type='text'
            id='Number'
            name='number'
            value={addressData.number}
            onChange={(e) =>
              setAddressData({ ...addressData, number: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.number ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.number && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.number}
            </p>
          )}
        </div>

        {/* Complemento */}
        <div className='col-span-6 sm:col-span-4'>
          <label
            htmlFor='AdditionalInfo'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Complemento
          </label>
          <input
            type='text'
            id='AdditionalInfo'
            name='additionalInfo'
            value={addressData.additionalInfo}
            onChange={(e) =>
              setAddressData({ ...addressData, additionalInfo: e.target.value })
            }
            className='mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
          />
        </div>

        {/* Cidade */}
        <div className='col-span-6 sm:col-span-2'>
          <label
            htmlFor='City'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Cidade
          </label>
          <input
            type='text'
            id='City'
            name='city'
            value={addressData.city}
            onChange={(e) =>
              setAddressData({ ...addressData, city: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.city ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.city && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.city}
            </p>
          )}
        </div>

        {/* Estado */}
        <div className='col-span-6 sm:col-span-2'>
          <label
            htmlFor='State'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Estado
          </label>
          <input
            type='text'
            id='State'
            name='state'
            value={addressData.state}
            onChange={(e) =>
              setAddressData({ ...addressData, state: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.state ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.state && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.state}
            </p>
          )}
        </div>

        {/* País */}
        <div className='col-span-6 sm:col-span-2'>
          <label
            htmlFor='Country'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            País
          </label>
          <input
            type='text'
            id='Country'
            name='country'
            value={addressData.country}
            onChange={(e) =>
              setAddressData({ ...addressData, country: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.country ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.country && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.country}
            </p>
          )}
        </div>

        {/* CEP */}
        <div className='col-span-6 sm:col-span-2'>
          <label
            htmlFor='PostalCode'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            CEP
          </label>
          <input
            type='text'
            id='PostalCode'
            name='postalCode'
            value={addressData.postalCode}
            onChange={(e) =>
              setAddressData({ ...addressData, postalCode: e.target.value })
            }
            className={`mt-1 w-full rounded-md border ${
              addressError.postalCode ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
          />
          {addressError.postalCode && (
            <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
              {addressError.postalCode}
            </p>
          )}
        </div>

        {/* Tipo de Endereço */}
        <div className='col-span-6'>
          <label
            htmlFor='AddressType'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
            Tipo de Endereço
          </label>
          <select
            id='AddressType'
            name='address_type'
            value={addressData.address_type}
            onChange={(e) =>
              setAddressData({ ...addressData, address_type: e.target.value })
            }
            className='mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'>
            <option value='comercial'>Comercial</option>
            <option value='residencial'>Residencial</option>
          </select>
        </div>

        {/* Botões para voltar e enviar */}
        <div className='col-span-6 flex justify-between'>
          <button
            type='button'
            onClick={handlePrevStep}
            className='inline-block rounded-md border border-gray-600 bg-gray-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-gray-600 focus:outline-none focus:ring dark:hover:bg-gray-700 dark:hover:text-white'>
            Voltar
          </button>
          <button
            type='submit'
            className='inline-block rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring dark:hover:bg-green-700 dark:hover:text-white'>
            Concluir
          </button>
        </div>
      </form>
    );
  };

  // Componentes da barra de progresso
  const steps = [
    { id: 1, name: 'Dados do Usuário' },
    { id: 2, name: 'Dados do Cliente' },
    { id: 3, name: 'Endereço' },
  ];

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
        {/* Seção da imagem ou cabeçalho */}
        <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
          {/* Imagem ou conteúdo adicional */}
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
                      <span
                        className={`absolute -bottom-[1.75rem] ${
                          index === 0
                            ? 'start-0'
                            : index === steps.length - 1
                            ? 'end-0'
                            : 'left-1/2 -translate-x-1/2'
                        } rounded-full ${
                          currentStep === step.id
                            ? 'bg-blue-600'
                            : currentStep > step.id
                            ? 'bg-green-600'
                            : 'bg-gray-600'
                        } text-white`}>
                        <svg
                          className='size-5'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
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
            {currentStep === 1 && renderUserDetails()}
            {currentStep === 2 && renderClientDetails()}
            {currentStep === 3 && renderAddressDetails()}
          </div>
        </main>
      </div>
    </section>
  );
}
