import config from './config.json'
import compiler from './compiler'
import { Contract } from '../store/features/contract/types'

const TESTNET = 'TESTNET'
const MAINNET = 'MAINNET'
const LOCALNET = 'LOCALNET'

const keyPrefix = 'IOST_playground_'

export const nets: Network[] = [TESTNET, MAINNET, LOCALNET]

export const getNetName = (net: Network) => {
  switch (net) {
    case TESTNET:
      return 'Test net'
    case MAINNET:
      return 'Main net'
    case LOCALNET:
      return 'Local net'
  }
}

export const getFileNameWithExtension = (fileName: string) => {
  const e = fileName.split('.')
  const extension = e[e.length - 1]
  return extension === 'js' ? fileName : `${fileName}.js`
}

export const restoreContract = (code: string) => {
  try {
    let contractCode = code.replace(
      /_IOSTInstruction_counter.incr\([0-9]*.?[0-9]+\)[;,]/g,
      ''
    )

    contractCode = contractCode.replace(/_IOSTTemplateTag/g, '')
    contractCode = contractCode.replace(/_IOSTSpreadElement\(([^(,]*)\)/g, '$1')

    let attempts = 0 // avoid infinite loop
    while (contractCode.includes('_IOSTBinaryOp')) {
      if (attempts > 100) {
        contractCode = contractCode.replace(
          /_IOSTBinaryOp\((.*),{1} (.*),{1} '(.*)'\)\./g,
          '($1 $3 $2).'
        )

        contractCode = contractCode.replace(
          /_IOSTBinaryOp\((.*),{1} (.*),{1} '(.*)'\)/g,
          '($1 $3 $2)'
        )

        if (attempts > 200) {
          throw new Error('Exceeded max attempt times')
        }
      }

      contractCode = contractCode.replace(
        /_IOSTBinaryOp\(([^(,]*),{1} ([^(,]*),{1} '([^(,]*)'\)/g,
        '$1 $3 $2'
      )

      attempts++
    }
    return contractCode
  } catch (e) {
    throw new Error(e)
  }
}

export const compileCode = (code: string) => compiler(code)

export const getContractList = (): string[] => {
  const contractListStr = window.localStorage.getItem(keyPrefix + 'contracts')

  return contractListStr == null ? [] : JSON.parse(contractListStr)
}

export const getContract = (fileNameWithExtension: string) => {
  const fileStr = window.localStorage.getItem(keyPrefix + fileNameWithExtension)

  return fileStr || ''
}

export const renameContract = (oldName: string, newName: string) => {
  const code = getContract(oldName)
  removeContract(oldName)
  setContract(newName, code)
}

export const setContract = (fileNameWithExtension: string, code: string) => {
  window.localStorage.setItem(keyPrefix + fileNameWithExtension, code)
}

export const setContractList = (newContractList: string[]) => {
  window.localStorage.setItem(
    keyPrefix + 'contracts',
    JSON.stringify(newContractList)
  )
}

export const removeContract = (fileNameWithExtension: string) => {
  window.localStorage.removeItem(keyPrefix + fileNameWithExtension)
}

export const setItem = (key: string, item: string) =>
  window.localStorage.setItem(key, item)
