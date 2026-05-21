/**
 * Parallel route slot のデフォルト fallback。
 * Slot にマッチするセグメントが無いときに描画される。
 * /panel という独立ルートを持たないので空でよい。
 */
export default function Default() {
	return null;
}
