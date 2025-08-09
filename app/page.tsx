"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  Crown,
  CheckCircle,
  Star,
  Loader2,
  ArrowRight,
  Clock,
  Eye,
  EyeOff,
  Shield,
  Sprout,
} from "lucide-react"
import { maskCPF, maskRG, maskPhone, unmaskValue } from "@/utils/input-masks"
import { AVAILABLE_CRYPTOS } from "@/utils/crypto-list"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSelector } from "@/components/LanguageSelector"

export default function AgroDeriLanding() {
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  // Debug logs
  console.log("Current language:", language)
  console.log("Sample translation test:", t("main.title"))

  useEffect(() => {
    setMounted(true)

    // Listen for language changes
    const handleLanguageChange = () => {
      console.log("Language changed event received")
      // Force component re-render
      setMounted(false)
      setTimeout(() => setMounted(true), 50)
    }

    window.addEventListener("languageChanged", handleLanguageChange)
    return () => window.removeEventListener("languageChanged", handleLanguageChange)
  }, [])

  const toArray = (v: string | string[]) => (Array.isArray(v) ? v : [v])
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState("")
  const [amount, setAmount] = useState(0)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    rg: "",
    password: "",
    confirmPassword: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [loading, setLoading] = useState(false)
  const [pixCode, setPixCode] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [paymentString, setPaymentString] = useState("")
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [contractCreated, setContractCreated] = useState(false)
  const [contractData, setContractData] = useState(null)
  const [documentIdClicksign, setDocumentIdClicksign] = useState("")
  const [contractDownloadUrl, setContractDownloadUrl] = useState("")
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    rg: "",
    amount: "",
    password: "",
    confirmPassword: "",
  })
  const [selectedCrypto, setSelectedCrypto] = useState("")
  const [showAllCryptos, setShowAllCryptos] = useState(false)
  const [isPrefilledUser, setIsPrefilledUser] = useState(false)

  const checkoutRef = useRef<HTMLDivElement>(null)

  const [showPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmPassword, setShowPassword] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginErrors, setLoginErrors] = useState({
    username: "",
    password: "",
    general: "",
  })

  const [cryptoAddress, setCryptoAddress] = useState("")
  const [cryptoNetwork, setCryptoNetwork] = useState("")
  const [cryptoNetworkName, setCryptoNetworkName] = useState("")
  const [cryptoLoading, setCryptoLoading] = useState(false)

  const searchParams = useSearchParams()

  // Chart data for the modal
  const chartData = [
    { month: "Jan", value: 8.5, height: 25 },
    { month: "Fev", value: 12.3, height: 35 },
    { month: "Mar", value: 15.7, height: 45 },
    { month: "Abr", value: 18.2, height: 52 },
    { month: "Mai", value: 22.1, height: 62 },
    { month: "Jun", value: 19.8, height: 56 },
    { month: "Jul", value: 25.4, height: 70 },
    { month: "Ago", value: 28.9, height: 78 },
    { month: "Set", value: 32.1, height: 85 },
    { month: "Out", value: 29.7, height: 80 },
    { month: "Nov", value: 35.2, height: 92 },
    { month: "Dez", value: 38.6, height: 100 },
  ]

  // Static data with fallbacks
  const packages = [
    {
      id: "starter",
      name: t("packages.raizDoAgro.name"),
      minValue: 50,
      maxValue: 249,
      cliff: 0,
      vesting: 12,
      bonus: t("packages.raizDoAgro.bonus"),
      features: ["Tokens SET proporcionais", "Grupo WhatsApp oficial", "Alertas de mercado", "Campanhas da comunidade"],
      color: "blue",
    },
    {
      id: "plus",
      name: t("packages.agroDeriPlus.name"),
      minValue: 250,
      maxValue: 999,
      cliff: 0,
      vesting: 18,
      bonus: t("packages.agroDeriPlus.bonus"),
      features: [
        "Tudo do pacote anterior",
        "Acesso antecipado staking",
        "NFT investidor pioneiro",
        "5% desconto próxima rodada",
        "Grupo fechado AgroDeri+",
      ],
      color: "blue",
      popular: true,
    },
    {
      id: "premium",
      name: t("packages.agroMaster.name"),
      minValue: 1000,
      maxValue: 4999,
      cliff: 3,
      vesting: 24,
      bonus: t("packages.agroMaster.bonus"),
      features: [
        "Tokens SET + 15% bônus",
        "NFT exclusivo Master",
        "Acesso aos fundadores",
        "Staking taxa promocional",
        "Prioridade nas próximas fases",
      ],
      color: "yellow",
    },
    {
      id: "elite",
      name: t("packages.agroElite.name"),
      minValue: 5000,
      maxValue: 19999,
      cliff: 6,
      vesting: 24,
      bonus: t("packages.agroElite.bonus"),
      features: [
        "Tokens SET + 25% bônus",
        "NFT Elite exclusivo",
        "Reuniões estratégicas",
        "Staking VIP",
        "Acesso antecipado a novos produtos",
      ],
      color: "purple",
    },
    {
      id: "whale",
      name: t("packages.agroWhale.name"),
      minValue: 20000,
      maxValue: 99999,
      cliff: 6,
      vesting: 36,
      bonus: t("packages.agroWhale.bonus"),
      features: [
        "Tokens SET + 30% bônus",
        "NFT Whale ultra-raro",
        "Consultoria personalizada",
        "Staking premium",
        "Participação em decisões estratégicas",
      ],
      color: "indigo",
    },
    {
      id: "institutional",
      name: t("packages.institutional.name"),
      minValue: 100000,
      maxValue: 500000,
      cliff: 6,
      vesting: 36,
      bonus: t("packages.institutional.bonus"),
      features: [
        "Tokens SET + 35% bônus",
        "NFT VIP institucional",
        "Acesso direto à diretoria",
        "Staking institucional",
        "Participação no conselho consultivo",
      ],
      color: "gray",
    },
  ]

  const steps = [t("steps.package"), t("steps.data"), t("steps.payment"), t("steps.confirmation")]

  // Gerar QR Code PIX real quando chegar no step 2.5
  useEffect(() => {
    if (currentStep === 2.5) {
      generateRealPixCode()
    }
  }, [currentStep, amount, userData.cpf])

  // Gerar endereço crypto quando chegar no step 2.7
  useEffect(() => {
    if (currentStep === 2.7 && selectedCrypto) {
      generateCryptoAddress()
    }
  }, [currentStep, selectedCrypto])

  // Detectar step da URL
  useEffect(() => {
    const stepParam = searchParams?.get("step")

    if (stepParam) {
      // Mapear os steps da URL para os números internos
      switch (stepParam) {
        case "cadastro":
          setCurrentStep(1)
          break
        case "pagamento":
          setCurrentStep(2)
          break
        case "contrato":
          setCurrentStep(3)
          break
        default:
          setCurrentStep(0)
      }
    }
  }, [searchParams])

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent.toLowerCase(),
      )
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Verificar retorno do localStorage
  useEffect(() => {
    const returnUrl = localStorage.getItem("agroDeriReturnUrl")
    const userData = localStorage.getItem("agroDeriUserData")

    if (returnUrl && userData) {
      try {
        const user = JSON.parse(userData)
        setTimeout(() => {
          alert(`Olá novamente, ${user.name}! Você retornou da área do investidor.`)
        }, 1000)

        localStorage.removeItem("agroDeriReturnUrl")
        localStorage.removeItem("agroDeriUserData")
      } catch (error) {
        console.error("Erro ao processar dados de retorno:", error)
      }
    }
  }, [])

  // Listener para mensagens de pré-preenchimento
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "PREFILL_INVESTMENT_DATA") {
        const data = event.data.data

        setIsPrefilledUser(true)

        setUserData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          cpf: data.cpf || "",
          rg: data.rg || "",
          password: "",
          confirmPassword: "",
        })

        setCurrentStep(0)

        setTimeout(() => {
          checkoutRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)

        alert(`Bem-vindo de volta, ${data.name}! Seus dados foram pré-preenchidos. Escolha seu pacote de investimento.`)
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  const createContractDocument = async () => {
    try {
      setLoading(true)

      const response = await fetch("/api/create-contract-document/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: userData,
          amount: amount,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setContractCreated(true)
        setContractData(result.contract)

        if (result.contract) {
          if (result.contract.document_id) {
            setDocumentIdClicksign(result.contract.document_id)
          }
          if (result.contract.downloadUrl) {
            setContractDownloadUrl(result.contract.downloadUrl)
          }
        }

        console.log("✅ Processo completo: contrato criado e signatário notificado!")
        return true
      } else {
        console.error("❌ Erro ao criar contrato:", result)
        alert("Erro ao criar contrato: " + (result.error || "Erro desconhecido"))
        return false
      }
    } catch (error) {
      console.error("💥 Erro na criação do contrato:", error)
      alert("Erro de conexão ao criar contrato.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentConfirmation = async () => {
    try {
      setCheckingPayment(true)
      console.log("🔍 Verificando status do pagamento manualmente...")

      const response = await fetch("/api/check-payment-status/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf: unmaskValue(userData.cpf),
        }),
      })

      const result = await response.json()
      console.log("📦 Resultado completo:", result)

      if (result.success && result.confirmed) {
        console.log("✅ Pagamento confirmado!")
        setPaymentConfirmed(true)

        const contractSuccess = await createContractDocument()

        if (contractSuccess) {
          setCurrentStep(3)
          updateUrlForStep(3)
        }
      } else if (result.success && result.data) {
        if (paymentMethod === "crypto") {
          const depositCryptoValue = result.data.deposit_crypto_value
          const depositCryptoName = result.data.deposit_crypto_name

          console.log("🪙 Verificando pagamento crypto:")
          console.log("- deposit_crypto_value:", depositCryptoValue)
          console.log("- deposit_crypto_name:", depositCryptoName)

          if (
            depositCryptoValue &&
            depositCryptoName &&
            depositCryptoValue !== "0.0" &&
            depositCryptoValue !== null &&
            depositCryptoName !== "0.0" &&
            depositCryptoName !== null &&
            Number.parseFloat(depositCryptoValue) > 0
          ) {
            console.log("✅ Pagamento crypto confirmado!")
            console.log(`💰 Valor: ${depositCryptoValue} ${depositCryptoName}`)

            setPaymentConfirmed(true)

            const contractSuccess = await createContractDocument()

            if (contractSuccess) {
              setCurrentStep(3)
              updateUrlForStep(3)
            }
          } else {
            console.log("⏳ Pagamento crypto ainda não confirmado")
            alert(
              "Pagamento crypto ainda não foi identificado. Aguarde alguns minutos após a confirmação na blockchain e tente novamente.",
            )
          }
        } else {
          const depositValue = result.data.deposit_value

          if (depositValue && Number.parseFloat(depositValue) > 0) {
            console.log("✅ Pagamento PIX confirmado!")
            setPaymentConfirmed(true)

            const contractSuccess = await createContractDocument()

            if (contractSuccess) {
              setCurrentStep(3)
              updateUrlForStep(3)
            }
          } else {
            console.log("⏳ Pagamento PIX ainda não confirmado")
            alert("Pagamento PIX ainda não foi identificado. Aguarde alguns minutos e tente novamente.")
          }
        }
      } else {
        console.log("❌ Pagamento não confirmado ainda")
        const message =
          paymentMethod === "crypto"
            ? "Pagamento crypto ainda não foi identificado. Aguarde alguns minutos após a confirmação na blockchain e tente novamente."
            : "Pagamento PIX ainda não foi identificado. Aguarde alguns minutos e tente novamente."
        alert(message)
      }
    } catch (error) {
      console.error("❌ Erro ao verificar status do pagamento:", error)
      alert("Erro ao verificar pagamento. Tente novamente.")
    } finally {
      setCheckingPayment(false)
    }
  }

  const generateFallbackPixCode = () => {
    setQrCodeUrl(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png",
    )
    setPaymentString(
      "00020126580014BR.GOV.BCB.PIX0136123e4567-e12f-4567-1234-1234567890ab5204000053039865802BR5925Nome do Recebedor da Silva6009Sao Paulo62200516123e4567890abcdef63041234",
    )
  }

  const generateRealPixCode = async () => {
    try {
      setLoading(true)

      const response = await fetch("/api/generate-pix/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: amount,
          cpf: unmaskValue(userData.cpf),
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        if (result.qrCode) {
          setQrCodeUrl(result.qrCode)
        } else {
          generateFallbackPixCode()
        }

        if (result.paymentString) {
          setPaymentString(result.paymentString)
        } else {
          if (result.originalData) {
            const originalData = result.originalData

            const possibleQrFields = ["qrCode", "qr_code", "qr", "qrcode"]
            const possibleStringFields = ["paymentString", "payment_string", "pix_code", "code", "pix"]

            for (const field of possibleQrFields) {
              if (originalData[field]) {
                setQrCodeUrl(originalData[field])
                break
              }
            }

            for (const field of possibleStringFields) {
              if (originalData[field]) {
                setPaymentString(originalData[field])
                break
              }
            }
          }

          if (!paymentString) {
            generateFallbackPixCode()
          }
        }
      } else {
        console.error("❌ Erro ao gerar PIX:", result)
        alert("Erro ao gerar PIX: " + (result.error || "Erro desconhecido"))
        generateFallbackPixCode()
      }
    } catch (error) {
      console.error("💥 Erro na geração do PIX:", error)
      alert("Erro de conexão ao gerar PIX. Usando código de exemplo.")
      generateFallbackPixCode()
    } finally {
      setLoading(false)
    }
  }

  const generateCryptoAddress = async () => {
    try {
      setCryptoLoading(true)
      console.log("🔄 Gerando endereço crypto para:", selectedCrypto)

      const response = await fetch("/api/generate-crypto-address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coin: selectedCrypto,
        }),
      })

      console.log("📊 Status da resposta crypto:", response.status)

      const result = await response.json()
      console.log("📦 Resposta da API crypto:", result)

      if (response.ok && result.success && result.address_info) {
        console.log("✅ Endereço crypto gerado com sucesso!")
        setCryptoAddress(result.address_info.address)
        setCryptoNetwork(result.address_info.network)
        setCryptoNetworkName(result.address_info.networkName)
      } else {
        console.error("❌ Erro ao gerar endereço crypto:", result)
        alert("Erro ao gerar endereço crypto: " + (result.error || result.message || "Erro desconhecido"))
      }
    } catch (error) {
      console.error("💥 Erro na geração do endereço crypto:", error)
      alert("Erro de conexão ao gerar endereço crypto.")
    } finally {
      setCryptoLoading(false)
    }
  }

  const copyPixCode = async () => {
    try {
      await navigator.clipboard.writeText(paymentString)
      alert(t("common.copied"))
    } catch (err) {
      alert("Erro ao copiar código PIX")
    }
  }

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg.id)
    setAmount(pkg.minValue)
    setCurrentStep(1)
    updateUrlForStep(1)
  }

  const validateCPF = (cpf: string) => {
    const cleanCPF = unmaskValue(cpf)
    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += Number.parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cleanCPF.charAt(9))) return false

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += Number.parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    return remainder === Number.parseInt(cleanCPF.charAt(10))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const cleanPhone = unmaskValue(phone)
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
  }

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  }

  const handleLogin = async () => {
    try {
      setLoginLoading(true)
      setLoginErrors({ username: "", password: "", general: "" })

      const errors = { username: "", password: "", general: "" }

      if (!loginData.username.trim()) {
        errors.username = "Email é obrigatório"
      } else if (!validateEmail(loginData.username)) {
        errors.username = "Email inválido"
      }

      if (!loginData.password.trim()) {
        errors.password = "Senha é obrigatória"
      }

      if (errors.username || errors.password) {
        setLoginErrors(errors)
        return
      }

      const response = await fetch("https://api.setoken.com.br/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setShowLoginModal(false)

        const investorUrl = `/investor-dashboard?token=${result.token}&user=${encodeURIComponent(loginData.username)}&cpf=${result.cpf}&user_id=${result.user_id}`

        if (isMobile) {
          console.log("📱 Dispositivo móvel detectado, usando redirecionamento direto")

          const newWindow = window.open(investorUrl, "_blank")

          if (!newWindow || newWindow.closed || typeof newWindow.closed == "undefined") {
            console.log("🚫 Pop-up bloqueado, redirecionando na mesma aba")

            const confirmRedirect = confirm(
              `Olá ${result.first_name || loginData.username}!\n\n` +
                "Você será redirecionado para sua área do investidor. " +
                "Para voltar a esta página, use o botão 'Voltar' do navegador.\n\n" +
                "Deseja continuar?",
            )

            if (confirmRedirect) {
              localStorage.setItem("agroDeriReturnUrl", window.location.href)
              localStorage.setItem(
                "agroDeriUserData",
                JSON.stringify({
                  name: result.first_name || loginData.username,
                  email: loginData.username,
                }),
              )

              window.location.href = investorUrl
            }
          } else {
            console.log("✅ Nova aba aberta com sucesso")
            alert(
              `Bem-vindo, ${result.first_name || loginData.username}! Sua área do investidor foi aberta em uma nova aba.`,
            )
          }
        } else {
          const newWindow = window.open(investorUrl, "_blank")

          if (!newWindow) {
            alert("Pop-ups estão bloqueados. Por favor, permita pop-ups para este site e tente novamente.")
          } else {
            alert(
              `Bem-vindo, ${result.first_name || loginData.username}! Sua área do investidor foi aberta em uma nova aba.`,
            )
          }
        }

        setLoginData({ username: "", password: "" })
      } else {
        if (result.non_field_errors) {
          setLoginErrors({
            ...errors,
            general: Array.isArray(result.non_field_errors) ? result.non_field_errors[0] : result.non_field_errors,
          })
        } else if (result.detail) {
          setLoginErrors({ ...errors, general: result.detail })
        } else if (result.username) {
          setLoginErrors({ ...errors, username: Array.isArray(result.username) ? result.username[0] : result.username })
        } else if (result.password) {
          setLoginErrors({ ...errors, password: Array.isArray(result.password) ? result.password[0] : result.password })
        } else {
          setLoginErrors({ ...errors, general: "Credenciais inválidas. Verifique seu email e senha." })
        }
      }
    } catch (error) {
      setLoginErrors({ username: "", password: "", general: "Erro de conexão. Tente novamente." })
    } finally {
      setLoginLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      rg: "",
      amount: "",
      password: "",
      confirmPassword: "",
    }

    if (!userData.name.trim()) {
      errors.name = "Nome completo é obrigatório"
    } else if (userData.name.trim().length < 3) {
      errors.name = "Nome deve ter pelo menos 3 caracteres"
    }

    if (!userData.email.trim()) {
      errors.email = "E-mail é obrigatório"
    } else if (!validateEmail(userData.email)) {
      errors.email = "E-mail inválido"
    }

    if (!isPrefilledUser) {
      if (!userData.password.trim()) {
        errors.password = "Senha é obrigatória"
      } else if (!validatePassword(userData.password)) {
        errors.password = "Senha deve ter pelo menos 8 caracteres, 1 maiúscula, 1 minúscula e 1 número"
      }

      if (!userData.confirmPassword.trim()) {
        errors.confirmPassword = "Confirmação de senha é obrigatória"
      } else if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = "Senhas não coincidem"
      }
    }

    if (!userData.phone.trim()) {
      errors.phone = "WhatsApp é obrigatório"
    } else if (!validatePhone(userData.phone)) {
      errors.phone = "Número de telefone inválido"
    }

    if (!userData.cpf.trim()) {
      errors.cpf = "CPF é obrigatório"
    } else if (!validateCPF(userData.cpf)) {
      errors.cpf = "CPF inválido"
    }

    if (!userData.rg.trim()) {
      errors.rg = "RG é obrigatório"
    } else if (unmaskValue(userData.rg).length < 7) {
      errors.rg = "RG deve ter pelo menos 7 caracteres"
    }

    if (!amount || amount < 50) {
      errors.amount = "Valor mínimo de investimento é R$ 50"
    }

    setFormErrors(errors)
    return Object.values(errors).every((error) => error === "")
  }

  const registerUser = async () => {
    try {
      setLoading(true)

      if (isPrefilledUser) {
        setCurrentStep(2)
        updateUrlForStep(2)
        return
      }

      const nameParts = userData.name.trim().split(" ")
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(" ") || firstName

      const registrationData = {
        username: userData.email,
        email: userData.email,
        password: userData.password,
        password2: userData.confirmPassword,
        first_name: firstName,
        last_name: lastName,
        cpf: unmaskValue(userData.cpf),
        whatsapp: unmaskValue(userData.phone),
        rg: unmaskValue(userData.rg),
      }

      try {
        const response = await fetch("https://api.agroderivative.tech/api/users/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(registrationData),
        })

        const result = await response.json()

        if (response.ok) {
          alert("Registro bem-sucedido!")
          setCurrentStep(2)
          updateUrlForStep(2)
        } else {
          handleRegistrationErrors(result)
        }
      } catch (error) {
        console.error("🌐 Erro de rede:", error)
        alert("Erro de conexão. Tente novamente.")
      }
    } catch (error) {
      console.error("💥 Erro geral:", error)
      alert("Erro inesperado. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrationErrors = (data: any) => {
    const backendErrors = {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      rg: "",
      amount: "",
      password: "",
      confirmPassword: "",
    }

    if (data.email) {
      backendErrors.email = Array.isArray(data.email) ? data.email[0] : data.email
    }
    if (data.password) {
      backendErrors.password = Array.isArray(data.password) ? data.password[0] : data.password
    }
    if (data.password2) {
      backendErrors.confirmPassword = Array.isArray(data.password2) ? data.password2[0] : data.password2
    }
    if (data.cpf) {
      backendErrors.cpf = Array.isArray(data.cpf) ? data.cpf[0] : data.cpf
    }
    if (data.whatsapp) {
      backendErrors.phone = Array.isArray(data.whatsapp) ? data.whatsapp[0] : data.whatsapp
    }
    if (data.rg) {
      backendErrors.rg = Array.isArray(data.rg) ? data.rg[0] : data.rg
    }
    if (data.username) {
      backendErrors.email = Array.isArray(data.username) ? data.username[0] : data.username
    }
    if (data.first_name) {
      backendErrors.name = Array.isArray(data.first_name) ? data.first_name[0] : data.first_name
    }
    if (data.last_name && !backendErrors.name) {
      backendErrors.name = Array.isArray(data.last_name) ? data.last_name[0] : data.last_name
    }

    if (data.non_field_errors) {
      alert(Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : data.non_field_errors)
    }

    setFormErrors(backendErrors)
  }

  const updateUrlForStep = (step: number) => {
    const stepNames: { [key: number]: string } = {
      0: "",
      1: "cadastro",
      2: "pagamento",
      2.5: "pagamento",
      2.7: "pagamento",
      3: "contrato",
    }

    const stepName = stepNames[step]
    if (stepName) {
      window.history.replaceState({}, "", `/?step=${stepName}`)
    } else {
      window.history.replaceState({}, "", "/")
    }
  }

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateForm()) {
        return
      }
      await registerUser()
      return
    }

    if (currentStep < 3) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      updateUrlForStep(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      resetCheckout()
      updateUrlForStep(0)
    } else if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      updateUrlForStep(newStep)
    }
  }

  const handlePayment = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (paymentMethod === "pix") {
        setCurrentStep(2.5)
        updateUrlForStep(2.5)
      } else if (paymentMethod === "crypto") {
        setCurrentStep(2.7)
        updateUrlForStep(2.7)
      }
    }, 2000)
  }

  const resetCheckout = () => {
    setCurrentStep(0)
    setSelectedPackage("")
    setAmount(0)
    setUserData({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      rg: "",
      password: "",
      confirmPassword: "",
    })
    setPaymentMethod("pix")
    setPixCode("")
    setQrCodeUrl("")
    setPaymentString("")
    setPaymentConfirmed(false)
    setContractCreated(false)
    setContractData(null)
    setDocumentIdClicksign("")
    setContractDownloadUrl("")
    setFormErrors({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      rg: "",
      amount: "",
      password: "",
      confirmPassword: "",
    })
    setSelectedCrypto("")
    setCryptoAddress("")
    setCryptoNetwork("")
    setCryptoNetworkName("")
    setIsPrefilledUser(false)
  }

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case "cpf":
        setUserData({ ...userData, cpf: maskCPF(value) })
        break
      case "rg":
        setUserData({ ...userData, rg: maskRG(value) })
        break
      case "phone":
        setUserData({ ...userData, phone: maskPhone(value) })
        break
      case "password":
        setUserData({ ...userData, password: value })
        break
      case "confirmPassword":
        setUserData({ ...userData, confirmPassword: value })
        break
      default:
        setUserData({ ...userData, [field]: value })
    }
  }

  const getPackageIcon = (color: string) => {
    if (color === "blue") return <Sprout className="h-8 w-8" />
    if (color === "yellow") return <Crown className="h-8 w-8" />
    if (color === "purple") return <Star className="h-8 w-8" />
    if (color === "indigo") return <TrendingUp className="h-8 w-8" />
    return <Shield className="h-8 w-8" />
  }

  const getColorClass = (color: string) => {
    if (color === "blue") return "border-blue-200 bg-blue-50 text-[#202d3d]"
    if (color === "yellow") return "border-yellow-200 bg-yellow-50 text-yellow-600"
    if (color === "purple") return "border-purple-200 bg-purple-50 text-purple-600"
    if (color === "indigo") return "border-indigo-200 bg-indigo-50 text-indigo-600"
    return "border-gray-200 bg-gray-50 text-gray-600"
  }

  const getPopularCryptos = () => {
    return AVAILABLE_CRYPTOS.slice(0, 3)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Inline Styles for Chart Animation */}

      <style jsx>{`
@keyframes chartGrow {
  from {
    height: 0px;
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Substituído a imagem da logo pelo texto "SET TOKEN" */}
            <span className="text-2xl font-bold text-[#202d3d]">SET TOKEN</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-[#a1d5df] text-[#202d3d] border-[#a1d5df]">
              {t("header.preOrder")}
            </Badge>
            <Button
              size="lg"
              className="bg-[#202d3d] hover:bg-[#1a2530] text-white px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => setShowLoginModal(true)}
            >
              {t("header.trackInvestment")}
            </Button>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Checkout Section */}
      <section ref={checkoutRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">{t("main.title")}</h1>
            <p className="text-xl text-gray-600">{t("main.subtitle")}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? "bg-[#202d3d] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${index <= currentStep ? "text-[#202d3d]" : "text-gray-500"}`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${index < currentStep ? "bg-[#202d3d]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 0: Escolha do Pacote */}
          {currentStep === 0 && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`relative ${pkg.popular ? "ring-2 ring-[#202d3d] scale-105" : ""} hover:shadow-lg transition-all`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#202d3d]">
                      {t("packages.mostPopular")}
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${getColorClass(pkg.color)}`}>
                      {getPackageIcon(pkg.color)}
                    </div>
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {pkg.minValue.toLocaleString()} - R$ {pkg.maxValue.toLocaleString()}
                    </div>
                    <CardDescription className="text-[#202d3d] font-semibold">{pkg.bonus}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {t("packages.cliff")}: {pkg.cliff}m
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span>
                          {t("packages.vesting")}: {pkg.vesting}m
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-[#202d3d] mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full bg-[#202d3d] hover:bg-[#1a2530]" onClick={() => handlePackageSelect(pkg)}>
                      {t("packages.selectPackage")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{t("form.personalData")}</CardTitle>
                <CardDescription>{t("form.personalDataDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("form.fullName")} *</Label>
                    <Input
                      id="name"
                      placeholder={t("form.fullNamePlaceholder")}
                      value={userData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cpf">{t("form.cpf")} *</Label>
                    <Input
                      id="cpf"
                      placeholder={t("form.cpfPlaceholder")}
                      value={userData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                      className={formErrors.cpf ? "border-red-500" : ""}
                    />
                    {formErrors.cpf && <p className="text-red-500 text-sm mt-1">{formErrors.cpf}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rg">{t("form.rg")} *</Label>
                    <Input
                      id="rg"
                      placeholder={t("form.rgPlaceholder")}
                      value={userData.rg}
                      onChange={(e) => handleInputChange("rg", e.target.value)}
                      className={formErrors.rg ? "border-red-500" : ""}
                    />
                    {formErrors.rg && <p className="text-red-500 text-sm mt-1">{formErrors.rg}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("form.whatsapp")} *</Label>
                    <Input
                      id="phone"
                      placeholder={t("form.whatsappPlaceholder")}
                      value={userData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">{t("form.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    value={userData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>

                {/* Só mostrar campos de senha se não for usuário pré-cadastrado */}
                {isPrefilledUser ? (
                  <div className="bg-[#a1d5df] border border-[#a1d5df] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#202d3d] rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">ℹ️</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-[#202d3d] mb-1">Usuário já cadastrado</p>
                        <p className="text-[#202d3d]">
                          Seus dados foram pré-preenchidos. Verifique as informações e prossiga com seu investimento.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">{t("form.password")} *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("form.passwordPlaceholder")}
                          value={userData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className={`pr-10 ${formErrors.password ? "border-red-500" : ""}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
                      <p className="text-xs text-gray-500 mt-1">
                        Mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">{t("form.confirmPassword")} *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("form.confirmPasswordPlaceholder")}
                          value={userData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={`pr-10 ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {formErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="amount">{t("form.investmentAmount")} *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={t("form.investmentAmountPlaceholder")}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className={formErrors.amount ? "border-red-500" : ""}
                    min="50"
                  />
                  {formErrors.amount && <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>}
                  <p className="text-sm text-gray-500 mt-1">{t("form.minAmount")}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    {t("form.back")}
                  </Button>
                  <Button onClick={handleNext} className="flex-1 bg-[#202d3d] hover:bg-[#1a2530]" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isPrefilledUser ? t("form.validating") : t("form.creating")}
                      </>
                    ) : (
                      <>
                        {t("form.continue")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Método de Pagamento */}
          {currentStep === 2 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{t("payment.title")}</CardTitle>
                <CardDescription>
                  {t("payment.total")}: R$ {amount.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Seleção do método de pagamento */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">{t("payment.chooseMethod")}</Label>
                    <div className="grid grid-cols-1 gap-3 mt-3">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "pix"
                            ? "border-[#202d3d] bg-[#a1d5df]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("pix")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-[#202d3d] flex items-center justify-center">
                            {paymentMethod === "pix" && <div className="w-3 h-3 bg-[#202d3d] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-medium">{t("payment.pix")}</p>
                            <p className="text-sm text-gray-600">{t("payment.pixDesc")}</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "crypto"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("crypto")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
                            {paymentMethod === "crypto" && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                          </div>
                          <div>
                            <p className="font-medium">{t("payment.crypto")}</p>
                            <p className="text-sm text-gray-600">{t("payment.cryptoDesc")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seleção de Crypto se método for crypto */}
                  {paymentMethod === "crypto" && (
                    <div>
                      <Label className="text-base font-medium">{t("payment.chooseCrypto")}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                        {getPopularCryptos().map((crypto) => (
                          <div
                            key={crypto.coin}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedCrypto === crypto.coin
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedCrypto(crypto.coin)}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={crypto.icon || "/placeholder.svg"}
                                alt={crypto.coin}
                                className="w-6 h-6"
                                onError={(e: any) => {
                                  e.target.src = "/placeholder.svg?height=24&width=24"
                                }}
                              />
                              <div>
                                <p className="font-medium text-sm">{crypto.coin}</p>
                                <p className="text-xs text-gray-600">{crypto.name}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {!showAllCryptos && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
                          onClick={() => setShowAllCryptos(true)}
                        >
                          {t("payment.viewAllCryptos")}
                        </Button>
                      )}

                      {showAllCryptos && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                          {AVAILABLE_CRYPTOS.filter(
                            (crypto) => !getPopularCryptos().some((popular) => popular.coin === crypto.coin),
                          ).map((crypto) => (
                            <div
                              key={crypto.coin}
                              className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedCrypto === crypto.coin
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedCrypto(crypto.coin)}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={crypto.icon || "/placeholder.svg"}
                                  alt={crypto.coin}
                                  className="w-6 h-6"
                                  onError={(e: any) => {
                                    e.target.src = "/placeholder.svg?height=24&width=24"
                                  }}
                                />
                                <div>
                                  <p className="font-medium text-sm">{crypto.coin}</p>
                                  <p className="text-xs text-gray-600">{crypto.name}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Resumo do Investimento */}
                <div className="bg-[#a1d5df] p-4 rounded-lg">
                  <h3 className="font-semibold text-[#202d3d] mb-2">{t("payment.summary")}</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{t("payment.investedAmount")}</span>
                      <span>R$ {amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("payment.method")}</span>
                      <span className="capitalize">
                        {paymentMethod === "pix" ? t("payment.pix") : `${selectedCrypto || "Crypto"}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    {t("form.back")}
                  </Button>
                  <Button onClick={handlePayment} className="flex-1 bg-[#202d3d] hover:bg-[#1a2530]" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("payment.processing")}
                      </>
                    ) : (
                      <>
                        {t("payment.pay")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2.5: Pagamento PIX */}
          {currentStep === 2.5 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{t("payment.pixPayment")}</CardTitle>
                <CardDescription>
                  {t("payment.total")}: R$ {amount.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="text-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin inline-block" />
                    <p>{t("payment.generatingPix")}</p>
                  </div>
                ) : (
                  <>
                    {qrCodeUrl && (
                      <div className="flex justify-center">
                        <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code PIX" className="max-w-full h-auto" />
                      </div>
                    )}
                    {paymentString && (
                      <div className="space-y-4">
                        <Button className="w-full" onClick={copyPixCode}>
                          {t("payment.copyPixCode")}
                        </Button>
                        <p className="text-sm text-gray-500">{t("payment.orUseCode")}</p>
                        <div className="bg-gray-100 rounded-md p-3 break-all">
                          <p className="text-xs text-gray-700">{paymentString}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    {t("form.back")}
                  </Button>
                  <Button
                    onClick={handlePaymentConfirmation}
                    className="flex-1 bg-[#202d3d] hover:bg-[#1a2530]"
                    disabled={checkingPayment}
                  >
                    {checkingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("payment.checkingPayment")}
                      </>
                    ) : (
                      t("payment.confirmPayment")
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2.7: Pagamento Crypto */}
          {currentStep === 2.7 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{t("payment.cryptoPayment")}</CardTitle>
                <CardDescription>
                  {t("payment.total")}: R$ {amount.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {cryptoLoading ? (
                  <div className="text-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin inline-block" />
                    <p>{t("payment.generatingAddress")}</p>
                  </div>
                ) : (
                  <>
                    {cryptoAddress && cryptoNetwork && cryptoNetworkName && (
                      <div className="space-y-4">
                        <div className="bg-gray-100 rounded-md p-4">
                          <p className="text-sm font-medium">{t("payment.sendCryptoTo")}:</p>
                          <p className="text-xs text-gray-700 break-all">{cryptoAddress}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {t("payment.network")}: {cryptoNetworkName} ({cryptoNetwork})
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {t("payment.cryptoConfirmationNote")} {selectedCrypto}.
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    {t("form.back")}
                  </Button>
                  <Button
                    onClick={handlePaymentConfirmation}
                    className="flex-1 bg-[#202d3d] hover:bg-[#1a2530]"
                    disabled={checkingPayment}
                  >
                    {checkingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("payment.checkingPayment")}
                      </>
                    ) : (
                      t("payment.confirmPayment")
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmação e Contrato */}
          {currentStep === 3 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">{t("confirmation.title")}</CardTitle>
                <CardDescription>{t("confirmation.desc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contractCreated ? (
                  <>
                    <div className="bg-[#a1d5df] p-4 rounded-lg">
                      <h3 className="font-semibold text-[#202d3d] mb-2">{t("confirmation.contractDetails")}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>{t("confirmation.investedAmount")}</span>
                          <span>R$ {amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("confirmation.paymentMethod")}</span>
                          <span className="capitalize">
                            {paymentMethod === "pix" ? t("payment.pix") : `${selectedCrypto || "Crypto"}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {documentIdClicksign && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">{t("confirmation.signContract")}</p>
                        <Button
                          asChild
                          className="w-full bg-[#202d3d] hover:bg-[#1a2530]"
                          onClick={() => {
                            window.open(`https://app.clicksign.com/documents/${documentIdClicksign}/`)
                          }}
                        >
                          <a
                            href={`https://app.clicksign.com/documents/${documentIdClicksign}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t("confirmation.signNow")}
                          </a>
                        </Button>
                      </div>
                    )}

                    {contractDownloadUrl && (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500">{t("confirmation.downloadContract")}</p>
                        <Button
                          asChild
                          className="w-full bg-[#202d3d] hover:bg-[#1a2530]"
                          onClick={() => {
                            window.open(contractDownloadUrl)
                          }}
                        >
                          <a href={contractDownloadUrl} target="_blank" rel="noopener noreferrer">
                            {t("confirmation.download")}
                          </a>
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin inline-block" />
                    <p>{t("confirmation.creatingContract")}</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                    {t("form.back")}
                  </Button>
                  <Button
                    onClick={() => {
                      alert(t("confirmation.done"))
                      resetCheckout()
                      updateUrlForStep(0)
                    }}
                    className="flex-1 bg-[#202d3d] hover:bg-[#1a2530]"
                  >
                    {t("confirmation.done")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Enhanced Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl max-w-4xl w-full relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-xl"></div>
            </div>

            <div className="relative flex">
              <div className="flex-1 p-6 border-r border-gray-700">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">Evolução dos Rendimentos</h3>
                  <p className="text-sm text-gray-400">Últimos 12 meses</p>
                </div>

                {/* Chart with Simple Bars */}
                <div className="h-64 bg-gray-800/50 rounded-lg p-4">
                  <div className="h-48 flex items-end justify-between gap-1">
                    {[
                      { month: "Jan", height: 48, value: 8.5 },
                      { month: "Fev", height: 67, value: 12.3 },
                      { month: "Mar", height: 86, value: 15.7 },
                      { month: "Abr", height: 100, value: 18.2 },
                      { month: "Mai", height: 119, value: 22.1 },
                      { month: "Jun", height: 107, value: 19.8 },
                      { month: "Jul", height: 134, value: 25.4 },
                      { month: "Ago", height: 149, value: 28.9 },
                      { month: "Set", height: 163, value: 32.1 },
                      { month: "Out", height: 153, value: 29.7 },
                      { month: "Nov", height: 176, value: 35.2 },
                      { month: "Dez", height: 192, value: 38.6 },
                    ].map((data, index) => (
                      <div key={index} className="flex flex-col items-center group relative">
                        <div
                          className="w-6 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t hover:from-yellow-500 hover:to-yellow-300 transition-colors duration-300"
                          style={{
                            height: `${data.height}px`,
                            maxHeight: "192px",
                            animation: `chartGrow 800ms ease-out ${index * 100}ms both`,
                          }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{data.month}</span>

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          +{data.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-green-400">+191.6%</div>
                  <div className="text-sm text-gray-400">Rendimento acumulado</div>
                </div>

                {/* Additional Stats */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <div className="text-lg font-bold text-blue-400">R$ 47.832</div>
                    <div className="text-xs text-gray-400">Valor médio investido</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-400">R$ 139.456</div>
                    <div className="text-xs text-gray-400">Valor atual médio</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="flex-1 p-6">
                {/* Close Button */}
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header with Icon */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.11 3.89 21 5 21H11V19H5V3H13V9H21ZM14 13V11L20 17L14 23V21H12V13H14Z" />
                    </svg>
                  </div>

                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-2">
                    SEJA BEM-VINDO AO
                  </h2>
                  <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">
                    PORTAL DOS QUE FAZEM DINHEIRO
                  </h3>

                  <div className="flex items-center justify-center gap-2 text-gray-300 text-sm mb-6">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Seus rendimentos crescem mesmo enquanto você dorme</span>
                  </div>
                </div>

                {/* Login Form */}
                {loginErrors.general && (
                  <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-3 mb-4">
                    <p className="text-red-300 text-sm text-center">{loginErrors.general}</p>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Email ou CPF"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${
                        loginErrors.username ? "border-red-500" : "border-gray-600"
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all`}
                    />
                    {loginErrors.username && <p className="text-red-400 text-xs mt-1">{loginErrors.username}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Senha"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className={`w-full px-4 py-3 bg-gray-800/50 border ${
                        loginErrors.password ? "border-red-500" : "border-gray-600"
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all`}
                    />
                    {loginErrors.password && <p className="text-red-400 text-xs mt-1">{loginErrors.password}</p>}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleLogin}
                  disabled={loginLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loginLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>ACESSANDO...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>VER MEU LUCRO AGORA</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
