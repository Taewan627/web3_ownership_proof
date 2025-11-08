import React, { useState, useEffect } from 'react';
import { Shield, Brain, FileCheck, AlertTriangle, CheckCircle, Wallet, Activity, Lock, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export default function Web3OwnershipProof() {
  const [activeTab, setActiveTab] = useState('verify');
  const [walletAddress, setWalletAddress] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisLogs, setAnalysisLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  // 분석 단계별 로그 메시지
  const analysisSteps = [
    { step: '온체인 데이터 수집 중...', detail: '블록체인에서 트랜잭션 이력을 조회합니다', time: 500 },
    { step: '트랜잭션 패턴 분석', detail: '최근 100개 트랜잭션의 시간, 금액, 빈도를 분석합니다', time: 600 },
    { step: 'AI 행동 패턴 학습', detail: '사용자의 거래 습관과 활동 시간대를 학습합니다', time: 700 },
    { step: 'IP 및 접속 위치 검증', detail: '비정상적인 지역 접속이나 VPN 사용을 탐지합니다', time: 500 },
    { step: '서명 유효성 검사', detail: '개인키 서명의 일관성과 무결성을 확인합니다', time: 400 },
    { step: '이상 거래 탐지 실행', detail: 'ML 모델로 사기, 도난, 피싱 패턴을 스캔합니다', time: 800 },
    { step: 'DID 신원 인증', detail: '분산 신원과 생체 정보를 대조합니다', time: 600 },
    { step: '스마트 컨트랙트 감사', detail: '연결된 컨트랙트의 보안 취약점을 점검합니다', time: 500 },
    { step: 'ZKP 영지식 증명 생성', detail: '개인정보를 노출하지 않고 소유권을 증명합니다', time: 400 },
    { step: '최종 신뢰도 계산', detail: '모든 분석 결과를 종합하여 점수를 산출합니다', time: 400 }
  ];

  // 시뮬레이션된 상세 트랜잭션 로그
  const generateDetailedLogs = (result) => {
    const logs = [];
    const now = Date.now();
    
    // 온체인 데이터 로그
    logs.push({
      timestamp: new Date(now - 5000).toISOString(),
      type: 'info',
      category: '온체인 데이터',
      message: `총 ${result.analysis.onChainData.transactions}개의 트랜잭션 발견`,
      detail: `첫 활동: ${result.analysis.onChainData.firstActivity}, 최근 활동: ${result.analysis.onChainData.lastActivity}`
    });

    logs.push({
      timestamp: new Date(now - 4500).toISOString(),
      type: 'info',
      category: '온체인 데이터',
      message: `평균 가스비: ${result.analysis.onChainData.avgGasFee} ETH`,
      detail: '정상 범위 내의 가스비 사용 패턴'
    });

    // AI 패턴 분석 로그
    if (result.analysis.aiDetection.behaviorPattern !== '정상') {
      logs.push({
        timestamp: new Date(now - 4000).toISOString(),
        type: 'warning',
        category: 'AI 행동 분석',
        message: '비정상적인 거래 패턴 감지',
        detail: '평소와 다른 시간대(새벽 3-4시)에 대량 거래 발생. 통상 거래량의 350% 증가'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 4000).toISOString(),
        type: 'success',
        category: 'AI 행동 분석',
        message: '정상적인 거래 패턴 확인',
        detail: '일관된 활동 시간대(오전 9시-오후 6시)와 거래 빈도'
      });
    }

    // IP 일관성 로그
    if (result.analysis.aiDetection.ipConsistency === '변동 있음') {
      logs.push({
        timestamp: new Date(now - 3500).toISOString(),
        type: 'warning',
        category: 'IP 검증',
        message: '의심스러운 접속 위치 변경 감지',
        detail: '24시간 내 4개국(한국→미국→러시아→나이지리아)에서 접속. VPN 또는 프록시 사용 의심'
      });

      logs.push({
        timestamp: new Date(now - 3400).toISOString(),
        type: 'error',
        category: 'IP 검증',
        message: '고위험 국가에서의 접속 확인',
        detail: '사이버 범죄 다발 지역(IP: 185.220.xxx.xxx)에서 3회 로그인 시도'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 3500).toISOString(),
        type: 'success',
        category: 'IP 검증',
        message: 'IP 위치 일관성 확인',
        detail: '주요 접속 위치: 한국 서울 (95%), 정상 패턴'
      });
    }

    // 서명 검증 로그
    if (result.analysis.aiDetection.signatureValidity === '주의 필요') {
      logs.push({
        timestamp: new Date(now - 3000).toISOString(),
        type: 'warning',
        category: '서명 검증',
        message: '서명 불일치 케이스 발견',
        detail: '최근 5개 트랜잭션 중 2개에서 nonce 값 이상. 리플레이 공격 가능성 5.2%'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 3000).toISOString(),
        type: 'success',
        category: '서명 검증',
        message: '모든 서명 유효성 확인 완료',
        detail: '개인키 서명 100% 일치, 위조 흔적 없음'
      });
    }

    // 사기 위험 로그
    if (result.analysis.aiDetection.fraudRisk > 20) {
      logs.push({
        timestamp: new Date(now - 2500).toISOString(),
        type: 'error',
        category: '이상 거래 탐지',
        message: `높은 사기 위험도: ${result.analysis.aiDetection.fraudRisk}%`,
        detail: '알려진 피싱 주소(0x3a2f...)와 2회 거래 내역 확인. 다크웹 마켓플레이스 연관 의심'
      });

      logs.push({
        timestamp: new Date(now - 2400).toISOString(),
        type: 'warning',
        category: '이상 거래 탐지',
        message: '중복 송금 패턴 감지',
        detail: '동일 금액(0.5 ETH)을 30분 간격으로 10회 전송. 자동화된 봇 활동 의심'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 2500).toISOString(),
        type: 'success',
        category: '이상 거래 탐지',
        message: `낮은 사기 위험도: ${result.analysis.aiDetection.fraudRisk}%`,
        detail: '의심스러운 주소와의 거래 없음. 화이트리스트 주소와만 거래'
      });
    }

    // DID 인증 로그
    if (!result.analysis.did.verified) {
      logs.push({
        timestamp: new Date(now - 2000).toISOString(),
        type: 'error',
        category: 'DID 인증',
        message: '신원 인증 실패',
        detail: '등록된 DID 정보 없음. KYC 미완료 상태'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 2000).toISOString(),
        type: 'success',
        category: 'DID 인증',
        message: `DID 신원 인증 완료 (점수: ${result.analysis.did.identityScore}/100)`,
        detail: 'Worldcoin 생체 인증 연동 확인. 중복 계정 없음'
      });

      if (result.analysis.did.biometricMatch) {
        logs.push({
          timestamp: new Date(now - 1900).toISOString(),
          type: 'success',
          category: 'DID 인증',
          message: '생체 정보 매칭 성공',
          detail: '홍채 인증 99.7% 일치, 안면 인식 98.2% 일치'
        });
      }
    }

    // 스마트 컨트랙트 감사 로그
    const contractRisk = Math.random();
    if (contractRisk > 0.7) {
      logs.push({
        timestamp: new Date(now - 1500).toISOString(),
        type: 'warning',
        category: '컨트랙트 감사',
        message: '스마트 컨트랙트 취약점 발견',
        detail: '재진입 공격(Reentrancy) 가능성 있는 함수 2개 발견. OpenZeppelin 표준 미준수'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 1500).toISOString(),
        type: 'success',
        category: '컨트랙트 감사',
        message: '스마트 컨트랙트 안전성 확인',
        detail: 'OpenZeppelin 라이브러리 사용. 알려진 취약점 없음'
      });
    }

    // ZKP 생성 로그
    if (!result.analysis.zkp.validityConfirmed) {
      logs.push({
        timestamp: new Date(now - 1000).toISOString(),
        type: 'warning',
        category: 'ZKP 증명',
        message: '영지식 증명 검증 보류',
        detail: '증명 데이터 불충분. 추가 검증 필요'
      });
    } else {
      logs.push({
        timestamp: new Date(now - 1000).toISOString(),
        type: 'success',
        category: 'ZKP 증명',
        message: 'ZKP 생성 및 검증 완료',
        detail: 'SNARK 프로토콜 사용. 개인정보 노출 없이 소유권 증명 성공'
      });
    }

    // 최종 판정 로그
    logs.push({
      timestamp: new Date(now - 500).toISOString(),
      type: result.isValid ? 'success' : 'error',
      category: '최종 판정',
      message: result.isValid ? '소유권 검증 성공' : '소유권 검증 실패',
      detail: `종합 신뢰도: ${result.ownershipScore}/100 (${result.isValid ? '안전' : '위험'} 수준)`
    });

    return logs;
  };

  // 분석 진행 시뮬레이션
  useEffect(() => {
    if (isAnalyzing && currentStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        const step = analysisSteps[currentStep];
        setAnalysisLogs(prev => [...prev, {
          timestamp: new Date().toISOString(),
          message: step.step,
          detail: step.detail
        }]);
        setCurrentStep(prev => prev + 1);
      }, analysisSteps[currentStep].time);

      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, currentStep]);

  // 시뮬레이션된 AI 분석 함수
  const analyzeOwnership = async () => {
    setIsAnalyzing(true);
    setVerificationResult(null);
    setAnalysisLogs([]);
    setCurrentStep(0);

    // 분석 완료 대기
    const totalTime = analysisSteps.reduce((sum, step) => sum + step.time, 0);
    await new Promise(resolve => setTimeout(resolve, totalTime + 500));

    // 시뮬레이션 결과 생성
    const isHighRisk = Math.random() > 0.6;
    const result = {
      isValid: !isHighRisk,
      ownershipScore: isHighRisk ? Math.floor(Math.random() * 30) + 40 : Math.floor(Math.random() * 20) + 80,
      analysis: {
        onChainData: {
          transactions: Math.floor(Math.random() * 100) + 50,
          avgGasFee: (Math.random() * 0.05 + 0.01).toFixed(4),
          firstActivity: '2023-04-15',
          lastActivity: '2025-11-07',
          totalVolume: (Math.random() * 50 + 10).toFixed(2)
        },
        aiDetection: {
          behaviorPattern: isHighRisk ? '의심' : '정상',
          ipConsistency: isHighRisk ? '변동 있음' : '일관됨',
          signatureValidity: isHighRisk && Math.random() > 0.5 ? '주의 필요' : '검증됨',
          fraudRisk: isHighRisk ? Math.floor(Math.random() * 30) + 25 : Math.floor(Math.random() * 15)
        },
        did: {
          verified: !isHighRisk || Math.random() > 0.3,
          identityScore: isHighRisk ? Math.floor(Math.random() * 30) + 50 : Math.floor(Math.random() * 20) + 80,
          biometricMatch: !isHighRisk && Math.random() > 0.3
        },
        zkp: {
          proofGenerated: true,
          privacyPreserved: true,
          validityConfirmed: !isHighRisk || Math.random() > 0.4
        }
      },
      alerts: [],
      recommendations: []
    };

    // 경고 및 권장사항 생성
    if (result.analysis.aiDetection.fraudRisk > 20) {
      result.alerts.push('높은 사기 위험도 감지');
      result.recommendations.push('의심스러운 거래 주소 차단 권장');
      result.recommendations.push('2단계 인증(2FA) 활성화 필요');
    }
    if (result.analysis.aiDetection.ipConsistency === '변동 있음') {
      result.alerts.push('비정상적인 IP 패턴 감지');
      result.recommendations.push('VPN 사용 시 신뢰할 수 있는 서비스 이용');
      result.recommendations.push('로그인 알림 설정 활성화');
    }
    if (result.analysis.aiDetection.signatureValidity === '주의 필요') {
      result.alerts.push('서명 무결성 검토 필요');
      result.recommendations.push('하드웨어 월렛 사용 권장');
    }
    if (!result.analysis.zkp.validityConfirmed) {
      result.alerts.push('영지식 증명 검증 필요');
      result.recommendations.push('추가 신원 정보 제출 필요');
    }
    if (!result.analysis.did.verified) {
      result.alerts.push('DID 신원 인증 미완료');
      result.recommendations.push('KYC 인증 완료 필요');
    }

    const detailedLogs = generateDetailedLogs(result);
    setAnalysisLogs(prev => [...prev, ...detailedLogs]);
    setVerificationResult(result);
    setIsAnalyzing(false);
  };

  const handleVerify = () => {
    if (!walletAddress || walletAddress.trim().length < 10) {
      alert('올바른 지갑 주소를 입력해주세요 (10자 이상)');
      return;
    }
    analyzeOwnership();
  };

  const getLogIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={16} className="text-green-600" />;
      case 'warning': return <AlertTriangle size={16} className="text-orange-600" />;
      case 'error': return <AlertCircle size={16} className="text-red-600" />;
      default: return <Activity size={16} className="text-blue-600" />;
    }
  };

  const renderPipeline = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Web3 신뢰 파이프라인</h3>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-300">
          <div className="flex items-center mb-3">
            <Activity className="text-blue-600 mr-2" size={24} />
            <h4 className="font-bold text-blue-900">1. 데이터 수집</h4>
          </div>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• 온체인 트랜잭션</li>
            <li>• 오프체인 활동</li>
            <li>• 스마트 컨트랙트</li>
            <li>• 사용자 행동 패턴</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-300">
          <div className="flex items-center mb-3">
            <Brain className="text-purple-600 mr-2" size={24} />
            <h4 className="font-bold text-purple-900">2. AI 분석</h4>
          </div>
          <ul className="text-sm text-purple-800 space-y-2">
            <li>• 이상 거래 탐지</li>
            <li>• 행동 패턴 학습</li>
            <li>• 사기 위험 평가</li>
            <li>• 소유권 추적</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-300">
          <div className="flex items-center mb-3">
            <Shield className="text-green-600 mr-2" size={24} />
            <h4 className="font-bold text-green-900">3. 증명 검증</h4>
          </div>
          <ul className="text-sm text-green-800 space-y-2">
            <li>• DID 인증</li>
            <li>• 스마트 계약 감사</li>
            <li>• ZKP 생성</li>
            <li>• 자동 증명서 발행</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">소유권 증명 검증</h3>
      
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          지갑 주소 입력
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono text-sm"
          />
          <button
            onClick={handleVerify}
            disabled={isAnalyzing}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isAnalyzing ? 'AI 분석 중...' : '검증 시작'}
          </button>
        </div>
      </div>

      {/* 실시간 분석 로그 */}
      {analysisLogs.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6 border-2 border-gray-700">
          <div className="flex items-center mb-4">
            <Clock className="text-green-400 mr-2" size={20} />
            <h4 className="font-bold text-green-400">실시간 분석 로그</h4>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {analysisLogs.map((log, idx) => (
              <div key={idx} className="bg-gray-800 rounded p-3 font-mono text-xs">
                <div className="flex items-start gap-2">
                  {log.type && getLogIcon(log.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString('ko-KR')}
                      </span>
                      {log.category && (
                        <span className="text-blue-400 font-semibold">[{log.category}]</span>
                      )}
                    </div>
                    <div className={`${
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'warning' ? 'text-orange-400' :
                      log.type === 'error' ? 'text-red-400' :
                      'text-white'
                    }`}>
                      {log.message}
                    </div>
                    {log.detail && (
                      <div className="text-gray-500 mt-1 text-xs">
                        └─ {log.detail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {verificationResult && (
        <div className="space-y-4">
          {/* 전체 결과 */}
          <div className={`rounded-lg p-6 border-2 ${
            verificationResult.isValid 
              ? 'bg-green-50 border-green-300' 
              : 'bg-red-50 border-red-300'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {verificationResult.isValid ? (
                  <CheckCircle className="text-green-600 mr-3" size={32} />
                ) : (
                  <AlertTriangle className="text-red-600 mr-3" size={32} />
                )}
                <div>
                  <h4 className="font-bold text-lg">
                    {verificationResult.isValid ? '✓ 소유권 검증 완료' : '✗ 소유권 검증 실패'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    종합 신뢰도: {verificationResult.ownershipScore}/100
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${
                  verificationResult.ownershipScore >= 80 ? 'text-green-600' :
                  verificationResult.ownershipScore >= 60 ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {verificationResult.ownershipScore}
                </div>
                <div className="text-xs text-gray-500">신뢰도 점수</div>
              </div>
            </div>

            {verificationResult.alerts.length > 0 && (
              <div className="mt-4 space-y-2">
                <h5 className="font-bold text-sm text-gray-700 mb-2">⚠️ 발견된 문제점:</h5>
                {verificationResult.alerts.map((alert, idx) => (
                  <div key={idx} className="flex items-center text-sm text-red-700 bg-red-100 rounded px-3 py-2">
                    <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                    {alert}
                  </div>
                ))}
              </div>
            )}

            {verificationResult.recommendations.length > 0 && (
              <div className="mt-4 space-y-2">
                <h5 className="font-bold text-sm text-gray-700 mb-2">💡 권장사항:</h5>
                {verificationResult.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-center text-sm text-blue-700 bg-blue-100 rounded px-3 py-2">
                    <TrendingUp size={16} className="mr-2 flex-shrink-0" />
                    {rec}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 상세 분석 결과 */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* 온체인 데이터 */}
            <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                <Activity className="mr-2 text-blue-600" size={20} />
                온체인 데이터
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">총 트랜잭션:</span>
                  <span className="font-semibold">{verificationResult.analysis.onChainData.transactions}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">평균 가스비:</span>
                  <span className="font-semibold">{verificationResult.analysis.onChainData.avgGasFee} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">총 거래량:</span>
                  <span className="font-semibold">{verificationResult.analysis.onChainData.totalVolume} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최초 활동:</span>
                  <span className="font-semibold">{verificationResult.analysis.onChainData.firstActivity}</span>
                </div>
              </div>
            </div>

            {/* AI 탐지 결과 */}
            <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                <Brain className="mr-2 text-purple-600" size={20} />
                AI 이상 탐지
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">행동 패턴:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.aiDetection.behaviorPattern === '정상' 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {verificationResult.analysis.aiDetection.behaviorPattern}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IP 일관성:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.aiDetection.ipConsistency === '일관됨'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}>
                    {verificationResult.analysis.aiDetection.ipConsistency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">서명 유효성:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.aiDetection.signatureValidity === '검증됨'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}>
                    {verificationResult.analysis.aiDetection.signatureValidity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">사기 위험도:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.aiDetection.fraudRisk < 20 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {verificationResult.analysis.aiDetection.fraudRisk}%
                  </span>
                </div>
              </div>
            </div>

            {/* DID 인증 */}
            <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                <Wallet className="mr-2 text-indigo-600" size={20} />
                DID 인증
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">신원 검증:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.did.verified 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {verificationResult.analysis.did.verified ? '✓ 완료' : '✗ 미완료'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">신원 점수:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.did.identityScore >= 80
                      ? 'text-green-600'
                      : verificationResult.analysis.did.identityScore >= 60
                      ? 'text-orange-600'
                      : 'text-red-600'
                  }`}>
                    {verificationResult.analysis.did.identityScore}/100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">생체 인증:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.did.biometricMatch 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {verificationResult.analysis.did.biometricMatch ? '✓ 일치' : '- 대기'}
                  </span>
                </div>
              </div>
            </div>

            {/* ZKP 증명 */}
            <div className="bg-white rounded-lg p-5 border-2 border-gray-200">
              <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                <Lock className="mr-2 text-green-600" size={20} />
                영지식 증명 (ZKP)
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">증명 생성:</span>
                  <span className="font-semibold text-green-600">
                    {verificationResult.analysis.zkp.proofGenerated ? '✓ 완료' : '- 대기'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">프라이버시:</span>
                  <span className="font-semibold text-green-600">
                    {verificationResult.analysis.zkp.privacyPreserved ? '✓ 보호됨' : '✗ 미보호'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">유효성:</span>
                  <span className={`font-semibold ${
                    verificationResult.analysis.zkp.validityConfirmed 
                      ? 'text-green-600' 
                      : 'text-orange-600'
                  }`}>
                    {verificationResult.analysis.zkp.validityConfirmed ? '✓ 확인됨' : '⚠ 검토 필요'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 증명서 다운로드 */}
          {verificationResult.isValid && (
            <button className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all flex items-center justify-center shadow-lg">
              <FileCheck className="mr-2" size={20} />
              소유권 증명서 발행 및 다운로드
            </button>
          )}

          {!verificationResult.isValid && (
            <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
              <h5 className="font-bold text-orange-800 mb-2 flex items-center">
                <AlertTriangle className="mr-2" size={20} />
                검증 실패 안내
              </h5>
              <p className="text-sm text-orange-700">
                소유권 증명에 실패했습니다. 위의 권장사항을 확인하고 문제를 해결한 후 다시 시도해주세요.
                추가 지원이 필요한 경우 고객센터에 문의하시기 바랍니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-blue-600 mr-3" size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Web3 소유권 증명 시스템
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            분석형 AI로 완성하는 데이터 주권의 진짜 증명
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-2 shadow-md">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            신뢰 파이프라인
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'verify'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
            소유권 검증
          </button>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {activeTab === 'pipeline' && renderPipeline()}
          {activeTab === 'verify' && renderVerification()}
        </div>

        {/* 푸터 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Web3: 탈중앙의 기록 × AI: 기록을 해석하고 증명하는 두뇌</p>
          <p className="mt-1">= 검증된 소유권과 완성된 신뢰 생태계</p>
        </div>
      </div>
    </div>
  );
}