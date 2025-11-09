// Chat Box Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    // Toggle chat box
    chatToggle.addEventListener('click', function() {
        chatBox.classList.toggle('active');
    });
    
    // Close chat box
    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });
    
    // Send message
    sendMessage.addEventListener('click', function() {
        sendUserMessage();
    });
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    function sendUserMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user-message';
            userMessageDiv.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessageDiv);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate bot response after a delay
            setTimeout(function() {
                const botResponse = getBotResponse(message);
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'message bot-message';
                botMessageDiv.innerHTML = `<p>${botResponse}</p>`;
                chatMessages.appendChild(botMessageDiv);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Xin chào! Tôi có thể giúp gì cho bạn?';
        } else if (lowerMessage.includes('giờ') || lowerMessage.includes('mở cửa')) {
            return 'Các rạp của chúng tôi mở cửa từ 8:00 sáng đến 12:00 đêm hàng ngày.';
        } else if (lowerMessage.includes('giá vé') || lowerMessage.includes('giá')) {
            return 'Giá vé thông thường là 80.000 VNĐ. Có ưu đãi cho học sinh, sinh viên và người cao tuổi.';
        } else if (lowerMessage.includes('đặt vé') || lowerMessage.includes('mua vé')) {
            return 'Bạn có thể đặt vé trực tuyến trên website hoặc qua ứng dụng di động của chúng tôi.';
        } else if (lowerMessage.includes('phim') && lowerMessage.includes('đang chiếu')) {
            return 'Bạn có thể xem danh sách phim đang chiếu trong mục "Phim" trên website.';
        } else if (lowerMessage.includes('ưu đãi') || lowerMessage.includes('khuyến mãi')) {
            return 'Chúng tôi có nhiều ưu đãi hấp dẫn. Vui lòng kiểm tra mục "Tin mới & Ưu đãi" để biết thêm chi tiết.';
        } else if (lowerMessage.includes('cảm ơn') || lowerMessage.includes('thanks')) {
            return 'Không có gì! Nếu bạn có thêm câu hỏi, đừng ngần ngại hỏi tôi.';
        } else {
            return 'Xin lỗi, tôi không hiểu câu hỏi của bạn. Vui lòng liên hệ bộ phận hỗ trợ qua số 1800-xxxx hoặc email support@cinemax.com.';
        }
    }
});