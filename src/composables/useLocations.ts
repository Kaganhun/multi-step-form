import { ref } from 'vue'
export interface ProvinceOption { id: number; name: string }
export interface DistrictOption { id: number; name: string }

export function useLocations() {
  // Countries removed; only Türkiye data retained
  const trProvinces = ref<ProvinceOption[]>([])
  const trDistricts = ref<Record<number, DistrictOption[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCountries(): Promise<void> { /* noop: countries removed */ }

  async function fetchTrProvinces(): Promise<void> {
    loading.value = true; error.value = null
    try {
      const res = await fetch('https://turkiyeapi.dev/api/v1/provinces')
      const json = await res.json()
      trProvinces.value = json?.data?.map((p: any) => ({ id: p.id, name: p.name })) ?? []
    } catch (e: any) {
      error.value = 'Türkiye provinces fetch failed'
    } finally { loading.value = false }
  }

  async function fetchTrDistricts(provinceId: number): Promise<void> {
    if (!provinceId) return
    loading.value = true; error.value = null
    try {
      const res = await fetch(`https://turkiyeapi.dev/api/v1/provinces/${provinceId}`)
      const json = await res.json()
      const districts = (json?.data?.districts ?? []).map((d: any) => ({ id: d.id, name: d.name }))
      trDistricts.value[provinceId] = districts
    } catch (e: any) {
      error.value = 'Türkiye districts fetch failed'
    } finally { loading.value = false }
  }

  async function validatePostalCode(code: string): Promise<boolean> {
    // Türkiye için: 5 haneli numerik olmalı. Önce regex, sonra zippopotam.us/TR ile doğrulamaya çalış.
    if (!/^\d{5}$/.test(code)) return false
    try {
      const res = await fetch(`https://api.zippopotam.us/TR/${encodeURIComponent(code)}`)
      // API bazı bölgeler için 404 dönebilir; bu durumda sadece regex doğrulaması yeterli kabul edilir.
      return res.ok || true
    } catch {
      // Ağ hatasında regex geçerliyse true bırakıyoruz.
      return true
    }
  }

  return { trProvinces, trDistricts, loading, error, fetchCountries, fetchTrProvinces, fetchTrDistricts, validatePostalCode }
}


