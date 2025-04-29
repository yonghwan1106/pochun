// 포천 드론 밸리 제안서 자바스크립트

// 문서가 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 현재 페이지 활성화
    highlightCurrentPage();

    // 스크롤 이벤트 - 헤더 애니메이션
    window.addEventListener('scroll', function() {
        const header = document.querySelector('nav');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg');
                header.classList.add('bg-blue-900');
                header.classList.remove('bg-blue-800');
            } else {
                header.classList.remove('shadow-lg');
                header.classList.remove('bg-blue-900');
                header.classList.add('bg-blue-800');
            }
        }
    });

    // 데이터 테이블 정렬 기능 (테이블이 있는 경우)
    setupTableSorting();
});

// 현재 페이지 하이라이트
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // 데스크톱 네비게이션
    const desktopLinks = document.querySelectorAll('nav .hidden.md\\:block a');
    desktopLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('border-b-2', 'border-blue-300');
            link.classList.add('text-blue-200');
        } else {
            link.classList.remove('border-b-2', 'border-blue-300');
        }
    });

    // 모바일 네비게이션
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('bg-blue-700');
        } else {
            link.classList.remove('bg-blue-700');
        }
    });
}

// 테이블 정렬 기능
function setupTableSorting() {
    const tables = document.querySelectorAll('.data-table');
    
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((header, index) => {
            if (header.classList.contains('sortable')) {
                header.addEventListener('click', function() {
                    sortTable(table, index);
                });
                header.classList.add('cursor-pointer', 'select-none');
                header.innerHTML += ' <span class="sort-icon">↕️</span>';
            }
        });
    });
}

// 테이블 정렬 함수
function sortTable(table, column) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const headers = table.querySelectorAll('th');
    const header = headers[column];
    const isAscending = header.classList.contains('sort-asc');
    
    // 모든 헤더에서 정렬 클래스 제거
    headers.forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
        const icon = h.querySelector('.sort-icon');
        if (icon) icon.textContent = '↕️';
    });
    
    // 정렬 방향 설정
    if (isAscending) {
        header.classList.add('sort-desc');
        const icon = header.querySelector('.sort-icon');
        if (icon) icon.textContent = '↓';
    } else {
        header.classList.add('sort-asc');
        const icon = header.querySelector('.sort-icon');
        if (icon) icon.textContent = '↑';
    }
    
    // 데이터 정렬
    rows.sort((a, b) => {
        const aValue = a.cells[column].textContent.trim();
        const bValue = b.cells[column].textContent.trim();
        
        // 숫자인지 확인
        const aNum = parseFloat(aValue.replace(/[^\d.-]/g, ''));
        const bNum = parseFloat(bValue.replace(/[^\d.-]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? bNum - aNum : aNum - bNum;
        } else {
            return isAscending 
                ? bValue.localeCompare(aValue, 'ko') 
                : aValue.localeCompare(bValue, 'ko');
        }
    });
    
    // 정렬된 행 재배치
    const tbody = table.querySelector('tbody');
    rows.forEach(row => tbody.appendChild(row));
}

// 인쇄 기능
function printPage() {
    window.print();
}

// 탭 전환 기능
function openTab(evt, tabName) {
    // 모든 탭 콘텐츠 숨기기
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.add('hidden');
    }

    // 모든 탭 버튼 비활성화
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('bg-blue-500', 'text-white');
        tabButtons[i].classList.add('bg-gray-200', 'text-gray-700');
    }

    // 선택한 탭 표시 및 버튼 활성화
    document.getElementById(tabName).classList.remove('hidden');
    evt.currentTarget.classList.remove('bg-gray-200', 'text-gray-700');
    evt.currentTarget.classList.add('bg-blue-500', 'text-white');
}
