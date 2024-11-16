// ClientDetailsStep.tsx
import React, { useState } from 'react';

interface ClientDetailsProps {
  clientType: string;
  individualData: {
    full_name: string;
    social_security_number: string;
    date_of_birth: string;
  };
  companyData: {
    company_name: string;
    tax_id_number: string;
    contact_person: string;
  };
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  setErrorMessage: (msg: string) => void;
}

const ClientDetailsStep: React.FC<ClientDetailsProps> = ({
  clientType,
  individualData,
  companyData,
  updateData,
  nextStep,
  prevStep,
  setErrorMessage,
}) => {
  const [individualError, setIndividualError] = useState<{
    full_name?: string;
    social_security_number?: string;
    date_of_birth?: string;
  }>({});
  const [companyError, setCompanyError] = useState<{
    company_name?: string;
    tax_id_number?: string;
    contact_person?: string;
  }>({});

  const validate = () => {
    let valid = true;
    if (clientType === 'individual') {
      const errors: { [key: string]: string } = {};
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
      const errors: { [key: string]: string } = {};
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
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (validate()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 grid grid-cols-6 gap-6'>
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
              onChange={(e) => updateData({ clientType: e.target.value })}
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
              onChange={(e) => updateData({ clientType: e.target.value })}
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
                updateData({
                  individualData: {
                    ...individualData,
                    full_name: e.target.value,
                  },
                })
              }
              className={`mt-1 w-full rounded-md border ${
                individualError.full_name ? 'border-red-500' : 'border-gray-200'
              } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
            />
            {individualError.full_name && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                {individualError.full_name}
              </p>
            )}
          </div>

          {/* Outros campos de pessoa física */}
          {/* ... (Mantenha o mesmo padrão) */}
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
                updateData({
                  companyData: {
                    ...companyData,
                    company_name: e.target.value,
                  },
                })
              }
              className={`mt-1 w-full rounded-md border ${
                companyError.company_name ? 'border-red-500' : 'border-gray-200'
              } bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200`}
            />
            {companyError.company_name && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-500'>
                {companyError.company_name}
              </p>
            )}
          </div>

          {/* Outros campos de pessoa jurídica */}
          {/* ... (Mantenha o mesmo padrão) */}
        </>
      )}

      {/* Botões para voltar e avançar */}
      <div className='col-span-6 flex justify-between'>
        <button
          type='button'
          onClick={prevStep}
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

export default ClientDetailsStep;
